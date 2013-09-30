
define(['core/boilerplate', 'conf/player'],
	function(Boilerplate, Conf) {
		var Player = function() {

			// General properties
			this.id = null;
			this.isDestroyed = false;

			// Physics
			this.pos = {x:null,y:null};
			this.size = {x:75,y:90};
			this.offset = 0;
			this.collider = {pos:{x:null,y:null},size:{x:null,y:null}};

			// Movement
			this.speed = Conf.speed;
			this._speed = Conf.speed;
			this.target = {pos:{x:null,y:null}};
			this.moveDelta = 0;
			this.moveDeltaStep = 0;

			// Graphics
			this.sprite = null;
			this.reverse = false;

			// Game properties
			this.energy = 0;
			this.energyMax = 0;
			this.energyTimer = 0;
			this.energyDelta = 0;

			// Game over properties
			this.defeat = 0;
			this.victory = 0;

			this.init = function(PlayerManager) {
				// Set player id according to the list of entities already defined
				this.id = PlayerManager.entities.length;

				// Load default configuration
				this.load();

				// Get properties from configuration
				this.sprite = new Image();
				this.sprite.src = Conf.sprites[this.id];
			}

			this.load = function() {
				// Place original spawn point at middle-bottom screen
				this.pos = {
					x : Math.round(Boilerplate.scene.width/2) - Math.round(this.size.x/2),
					y : Boilerplate.scene.height - Math.round(this.size.y*1.5) - Conf.margin
				}

				// Set box collider
				this.collider.size.x = this.size.x/2;
				this.collider.size.y = this.size.y/3;
				this.moveCollider();

				// Apply negative offset to the second player
				var playerId = 1;
				if(Boilerplate.controller.multiplayerPlayerId !== null) {
					if(Boilerplate.controller.multiplayerPlayerId == 1) {
						playerId = 0;
					}
					else {
						playerId = 1;
					}
				}
				
				if(this.id === playerId) {
					this.offset = this.pos.y - Math.round(this.size.y/2) - Conf.margin;
					this.reverse = true;
					this.pos.y -= this.offset;
					this.collider.pos.y -= (this.offset+this.collider.size.y);
				}

				// Define player target position
				this.target.pos.x = this.pos.x;
				this.target.pos.y = this.pos.y;

				// Get properties from configuration
				this.energy = Conf.energyMax;
				this.energyMax = Conf.energyMax;
				this.energySplit = Conf.energySplitMax;
				this.energySplitMax = Conf.energySplitMax;

				// Set timer for movement
				this.moveTimer = +new Date();
				this.moveDelta = Conf.moveDeltaStep;
			}
		}

		Player.prototype = {
			name : "Player",
			update : function() {
				// Update Player objects

				// Move the player
				if (!Boilerplate.controller.standby)
					this.move();

				// Draw player on canvas
				this.render();
			},
			deltaExplosion: +new Date(),
			spriteX: 0,
			render : function() {
				
				var spriteY = 0;
				var spriteW = this.size.x;
				var spriteH = this.size.y;
				
				var sprite = this.sprite;
				if(this.isDestroyed) {
					sprite = this.explosion;
					spriteW = 60;
					spriteH = 60;
					if(interval(this.deltaExplosion, 0.05)) {
						this.spriteX += spriteW;
						this.deltaExplosion = +new Date();
					}
				}

				// Render inversed player (on top)
				if(this.reverse === true) {
					Boilerplate.scene.ctx.save();
					Boilerplate.scene.ctx.scale(1,-1);
					Boilerplate.scene.ctx.drawImage(sprite,this.spriteX, spriteY, spriteW, spriteH, this.pos.x,this.pos.y*-1-this.size.y,this.size.x,this.size.y);
					Boilerplate.scene.ctx.restore();
				// Render original player
				} else {
					Boilerplate.scene.ctx.drawImage(sprite,this.spriteX, spriteY, spriteW, spriteH,this.pos.x,this.pos.y,this.size.x,this.size.y);
				}
			},

			move : function() {

				if(interval(this.moveTimer, this.moveDelta)) {
					var w = Boilerplate.scene.width;
		    		var h = Boilerplate.scene.height;

					// Parse list of pointers on screen
					for (var i = 0, c = Boilerplate.input.pointers.length; i < c; i++) {
		    			// Get space properties
		    			var x = Boilerplate.input.pointers[i].offsetX - this.size.x/2;
		    			var y = Boilerplate.input.pointers[i].offsetY;

		    			// console.log(y, Boilerplate.scene.height, Boilerplate.getManager('Hud').getOne(0).buttons[0].size.y);
		    			var sizeY = null;
		    			if (Boilerplate.getManager('Hud').getOne(0).buttons.length > 0)
		    				var sizeY = Boilerplate.getManager('Hud').getOne(0).buttons[0].size.y;
		    			else if (Boilerplate.getManager('Hud').getOne(0).buttonsPause.length > 0)
		    				var sizeY = Boilerplate.getManager('Hud').getOne(0).buttonsPause[0].size.y;

		    			if (sizeY !== null)
			    			if (y >= Boilerplate.scene.height - sizeY || y <= sizeY)
			    				continue;

		    			if (x < 0)
		    				x = 0;
		    			else if (x+this.size.x > Boilerplate.scene.width)
		    				x -= this.size.x/2;

		    			// Under the middle of the scene
		    			if(Boilerplate.controller.isMultiplayerMode) {
		    				this.moveTarget(x);
		    			} else {
		    				if(y > h/2 && this.id === 0) {
			    				this.moveTarget(x);
			    			// Over the middle of the scene
			    			} else if(y < h/2 && this.id === 1) {
			    				this.moveTarget(x);
			    			}
		    			}	
		    		}
		    	}
				
				var distanceToTarget = distance(this, this.target);
				if(distanceToTarget > 10) {
					var speed = this.speed - distanceToTarget/1000;
					if( speed > this._speed/2) {
						this.speed = speed;
					}
					// Move player to the target position
					move(this);
				}

				// Move player collider
				this.moveCollider();
			},
			moveCollider : function() {
				this.collider.pos.x = this.pos.x+this.size.x/Conf.colliderScaleX;
				this.collider.pos.y = this.pos.y+this.size.y/Conf.colliderScaleY;
				if(this.reverse === true) {
					this.collider.pos.y -= this.collider.size.y;
				}
			},
			moveTarget : function(x) {
				this.target.pos.x = x;

				this.speed = this._speed;
				
				if((new Date()).getTime() - this.moveTimer > 1000) {
					// multiplayer
					if(Boilerplate.controller.isMultiplayerMode) {
						var MultiplayerManager = Boilerplate.getManager('Multiplayer');
						MultiplayerManager.getOne(0).send('move', { x:  this.target.pos.x });
						
						this.moveTimer = +new Date();
					}
				}
			},
			heal : function() {
				this.energy ++;
			},
			wound : function(amount) {
				this.energy -= amount !== undefined ? amount : 1;

				// Player is dead
				if(this.energy <= 0 && this.isDestroyed === false) {
					// Destroy it
					this.destroy();
					
					return;
				}

				// Get HUD gauge
				var gauge = Boilerplate.getManager('Hud').getGaugeByPlayer(this.id);

				// Find amount by step
				var step = this.energyMax / this.energySplitMax;
				// Limit to the next step
				var limit = this.energyMax - (step * (this.energySplitMax - (this.energySplit - 1)));

				// Check if limit is cross
				if(this.energy <= limit) {
					// Decrease split
					this.energySplit --;
					// Update HUD gauge
					gauge.setEnergySplit(this.energySplit);
				}

				// Update HUD gauge
				gauge.setEnergy(this.energy, this.energyMax);

			},
			destroy : function() {
				this.isDestroyed = true;
				
				this.explosion = new Image();
				this.explosion.src = 'images/explosion.png';
				
				setTimeout(function() {
					log('Game Over player #'+this.id);
					if (this.id == 0)
						var winner = 'Orange';
					else
						var winner = 'Blue';
					Boilerplate.controller.gameOver(winner);
				}, 3000);
				
			}
		}

		return Player;
	}
);