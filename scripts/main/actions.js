define(['core/boilerplate', 'conf/actions'],
	function(Boilerplate, Conf) {
		var Actions = function() {

			this.value =  null;
			this.reload = null;		// reload time
			this.cost = null;		// how many health player lose when using related action
			this.level = null;
			this.actionTimer = new Date();
			this._lastUsedSkillName = null;
			this.init = function() {
				this.conf = Conf;
				this.conf.maxDistance = Boilerplate.scene.height;
				this.skills = [];
				this.shieldUp = [];
			}

			this.load = function() {
				for(var iS = 0, cS = this.skills.length; iS < cS; iS++) {
					var skill = this.skills[iS];
					delete this.skills[iS];
					skill = undefined;
				}
			}

			this.deleteAll = function(entities) {
				if (entities !== undefined) {
					for(var iE = 0, cE = entities.length; iE < cE; iE++) {
						var entity = entities[iE];
						delete entities[iE];
						entity = undefined;
					}
					return [];
				}
			}
			this.skills = [];

			// SKILLS
			this.launch = function(playerId, skill) {

				var confSkill = this.conf[skill]; // get Skill
				var targetId = "1"; // Target player
				if ( playerId == "1") {
					targetId = 0;
				}
				// Shield already UP
				if ( skill == "shield" && this.getPlayerShield(playerId) != null ) {
					return;
				}

				for ( var i = 1; i <= confSkill.nb; i++) {
					var bullet = this.getShootPos(playerId, confSkill, i); // Get skill SPEC and POS
					var spriteShield = new Image();
					if ( playerId == "1" && skill == "shield") {
						spriteShield.src = "images/shield_orange.png";
					} else {
						spriteShield.src = "images/shield_blue.png";
					}
					this.skills.push({
						type : confSkill.type,
						sprite : spriteShield,
						playerId : playerId,
						pos : {x:bullet.pos.x, y:bullet.pos.y}, 
						size : {x:bullet.size.x, y:bullet.size.y}, 
						speed : bullet.speed, 
						target : {
							id : targetId, 
							pos: {x:bullet.target.x, y:bullet.target.y}
						},
						damage:confSkill.damage,
						color:confSkill.color
					});
					var SoundManager = Boilerplate.getManager('Sound');
					var Sound = SoundManager.conf.sounds[confSkill.sound];
					Sound.object.play(Sound.fadeIn, Sound.loop, 'sound');
				}

				Boilerplate.getManager('Player').getOne(playerId).wound(confSkill.cost);
				this._lastUsedSkillName = skill;
			}
			this.shieldDestroy = function(playerId) {
				delete this.skills[this.getPlayerShield(playerId)];
				delete this.shieldUp[playerId];
			}

			// ANNEXE
			this.move = function(skill) {
				move(skill);
				
				// multiplayer
				if((new Date()).getTime() - this.actionTimer > 1500) {
					// multiplayer
					if(Boilerplate.controller.isMultiplayerMode) {
						var MultiplayerManager = Boilerplate.getManager('Multiplayer');
						MultiplayerManager.getOne(0).send(this._lastUsedSkillName);
						
						this.actionTimer = (new Date()).getTime();
					}
				}
			}
			// Get Real POS for a skill
			this.getShootPos = function(playerId, skill, i) {				
				var player = Boilerplate.getManager("Player").getPos(playerId); // get Player
				var newSkill = {pos:{x:0, y:0}, target:{x:0, y:0}, size:{x:skill.size.x, y:skill.size.y}, speed:skill.speed};
				switch (skill.pos.x) {
					case "center" : 
						newSkill.pos.x = player.pos.x + ( player.size.x / 2 ); 
					break;
					default:
						newSkill.pos.x = player.pos.x + (15*i); 
				}
				switch (skill.pos.y) {
					case "center" : 
						newSkill.pos.y = player.pos.y + ( player.size.y / 2 ); 
					break;
					default: 
						newSkill.pos.y = player.pos.y + skill.pos.y; 
					break;
				}
				switch (skill.target.x) {
					default: 
						newSkill.target.x = skill.target.x + newSkill.pos.x;
					break;
				}
				switch (skill.target.y) {
					case "max": 
						if ( playerId == "1")
							newSkill.target.y = this.conf.maxDistance;
						else
							newSkill.target.y = 0;
					break;
					default: 
						newSkill.target.y = player.pos.y + skill.target.y;
					break;
				}
				return newSkill;
			}
			this.getPlayerShield = function(playerId) {
				if ( this.skills != null ) {
					for ( var i = 0; i < this.skills.length; i++ ) {
						if ( "object" === typeof(this.skills[i]) ) {
							if ( this.skills[i].type == "defense" && this.skills[i].playerId == playerId) {
								return i;
							}
						}
					}
				}
				return null;
			}
			this.renderSkills = function() {
				for ( var i = 0; i < this.skills.length; i++ ) {
					if ( this.skills[i] == null ) continue;
					var skill = this.skills[i];
					// ATTACKS
					if ( skill.type == "attack") {
						// MOVE NOT FINISH
						if ( distance(skill, skill.target) > 3 ) {

							drawRect(Boilerplate.scene.ctx, skill.color, skill.pos.x, skill.pos.y, skill.size.x, skill.size.y);
							this.move(skill);

							targetPlayer = Boilerplate.getManager("Player").getPos(skill.target.id);

							if ( this.shieldUp[skill.target.id] != null && collide(skill, this.shieldUp[skill.target.id]) ) {
								var Sound = Boilerplate.getManager('Sound').conf.sounds['shield_hit'];
								Sound.object.play(false, false, 'sound');

								delete this.skills[i];
								skill = undefined;
							} else if ( collide(skill, targetPlayer.collider) ) {
								var Sound = Boilerplate.getManager('Sound').conf.sounds['explosion_2'];
								Sound.object.play(false, false, 'sound');

								Boilerplate.getManager("Player").getOne(skill.target.id).wound(skill.damage);
								delete this.skills[i];
								skill = undefined;
							}
						}
						else {
							delete this.skills[i];
							skill = undefined;
						}
					} 
					else if ( skill.type = "defense" ) {
						var player = Boilerplate.getManager("Player").getPos(skill.playerId);
						skill.pos.x = (player.pos.x - (player.size.x / 2)) -10;
						if ( skill.playerId == "1")
							skill.pos.y = player.pos.y + 20;
						else
							skill.pos.y = player.pos.y - 20;
						// SHIELD UP
						Boilerplate.scene.ctx.drawImage(skill.sprite, skill.pos.x, skill.pos.y);
						if ((new Date()).getTime() - this.actionTimer > 1500) {
							Boilerplate.getManager("Player").getOne(skill.playerId).wound(2);
							this.actionTimer = (new Date()).getTime();
						}
						this.shieldUp[skill.playerId] = skill;
					}
				}
			}
		}

		Actions.prototype = {
			name : "Actions",
			update : function() {
				this.render();
			},
			render : function() {
				this.renderSkills();
			}
		}

		return Actions;
	}
);