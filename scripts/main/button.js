define(['core/boilerplate', 'conf/button', 'actions'],
	function(Boilerplate, Conf, Actions) {
		var Button = function(id) {

			this.name = "Button";

			this.id = id;
			this.type = null;		// types basics : attack, shield, bonus
			this.level = 1;
			this.pos = {x:null,y:null};
			this.size = {x:null,y:null};
			this.playerId = null;
			this.reverse = false;
			this.enabled = false;	//
			this.configure(Conf);
			this.pointer = null;
			this.lastShotTime = 0;
			this.shotInterval = 250;
			this.missilesInterval = 1000;
			this.lastMissilesTime = 0;

			// Graphics
			this.sprite = null;
			this.spriteX = null;
			this.spriteY = null;
			this.reverse = false;

			this.setType = function(type) {
				this.type = type;
			}

			this.setValue = function(value) {
				this.value = value;
			}

			this.setReload = function(reload) {
				this.reload = reload;
			}

			this.setPos = function(pos) {
				this.pos = pos;
			}

			this.setSize = function(size) {
				this.size = size;
			}

			this.setCost = function(cost) {
				this.cost = cost;
			}

			this.setPlayerId = function(id) {
				this.playerId = id;
			}

			// initialize jauge
			this.init = function(playerId, type, level, pos, reverse) {
				this.playerId = playerId;
				this.type = type;
				this.level = level;
				this.pos = pos;
				this.reverse = reverse;

				// set sprite
				this.sprite = new Image();
				this.sprite.src = Conf.sprite;
				this.spriteY = Conf.positionY; // Default position is "normal"
				this.initSpritePositionXByType(this.type);
				this.sprite.width = Conf.width;
				this.sprite.height = Conf.height;

				this.playerId;
			}

			this.initSpritePositionXByType = function(type) {

				if(type === 'attackPrimary') {
					this.spriteX = Conf.positionXAttackPrimary;
				} else if(type === 'shield') {
					this.spriteX = Conf.positionXShield;
				} else if(type === 'attackSecondary') {
					this.spriteX = Conf.positionXAttackSecondary;
				}
			}

			this.attack = function() {
				// log();
			}

			this.execute = function() {

			}

			this.getAction = function() {
				// log(this.playerId);
				if(this.type === 'attackPrimary') {
					if (Boilerplate.conf.TIMING - this.lastShotTime > this.shotInterval) {
						Boilerplate.getManager('Actions').getOne(0).launch(this.playerId, 'laser');
						this.lastShotTime = Boilerplate.conf.TIMING;
						this.enabled = false;
					}
				} else if(this.type === 'attackSecondary') {
					if (Boilerplate.conf.TIMING - this.lastMissilesTime > this.missilesInterval) {
						Boilerplate.getManager('Actions').getOne(0).launch(this.playerId, 'rocket');
						this.lastMissilesTime = Boilerplate.conf.TIMING;
						this.spriteY = this.positionYDisabled;
						this.enabled = false;
					}
				} else if(this.type === 'shield') {
					Boilerplate.getManager('Actions').getOne(0).launch(this.playerId, 'shield');
				}
			}

			this.getActionReleased = function() {
				if(this.type === 'shield') {
					Boilerplate.getManager('Actions').getOne(0).shieldDestroy(this.playerId);
				}
			}

		}

		Button.prototype = {
			name : "Button",
			update : function() {

				if (this.enabled)
				{
					var t = Boilerplate.input.touched(this);
					if( t.status == true ) {
						this.pointer = t.pointer;
						// console.log('pointeur activé');
						this.getAction();
						this.spriteY = Conf.positionYPressed;
					}
					else {
						this.spriteY = Conf.positionY;
						var ut = Boilerplate.input.released(this);
				    	if (ut.status && this.pointer == ut.pointer) {
				    		this.pointer = null;
				    		// console.log('pointeur désactivé');
							this.getActionReleased();
				    	}
					}
			    }
			    else
			    {
			    	if (!Boilerplate.controller.standby)
			    	{
			    		if(this.type === 'attackPrimary') {
							if (Boilerplate.conf.TIMING - this.lastShotTime > this.shotInterval) {
								this.enabled = true;
							}
						} else if(this.type === 'attackSecondary') {
							if (Boilerplate.conf.TIMING - this.lastMissilesTime > this.missilesInterval) {
								this.enabled = true;
							}
						}
					}
			    	this.spriteY = Conf.positionYDisabled;
			    }

		    	// Gestion de l'état "activé/désactivé" du bouton en fonction de son timer
		    	/*if(this.type === 'attackPrimary') {
					if (Boilerplate.conf.TIMING - this.lastShotTime <= this.shotInterval) {
						this.spriteY = this.positionY;
					}
				}*/
			},
			render : function() {
				if(this.reverse === true) {
					Boilerplate.scene.ctx.save();
					Boilerplate.scene.ctx.scale(1,-1);
					// Boilerplate.scene.ctx.drawImage(this.sprite,this.pos.x,this.pos.y*-1);
					//drawRect(Boilerplate.scene.ctx,"rgba(255,255,255,.8)",this.pos.x,(this.pos.y*-1)-this.size.y-1,this.size.x,this.size.y);
					// log(((this.pos.y*-1)+this.sprite.height));
					Boilerplate.scene.ctx.drawImage(this.sprite, this.spriteX, this.spriteY, this.size.x, this.size.y, this.pos.x, ((this.pos.y*-1)-this.size.y-1), this.size.x, this.size.y);
					Boilerplate.scene.ctx.restore();
				} else {

					//drawRect(Boilerplate.scene.ctx,"rgba(255,255,255,.8)",this.pos.x + 3,this.pos.y + 3,this.size.x - 6,this.size.y - 6);
					Boilerplate.scene.ctx.drawImage(
						this.sprite,

						this.spriteX,
						this.spriteY,
						this.size.x,
						this.size.y,

						this.pos.x,
						this.pos.y,
						this.size.x,
						this.size.y
					);
				}

			}
		}

		return Button;
	}
);