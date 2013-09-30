define(['core/boilerplate', 'conf/buttonPause'],
	function(Boilerplate, Conf) {
		var ButtonPause = function(id) {

			this.name = "ButtonPause";

			this.id = id;
			this.pos = {x:null,y:null};
			this.size = {x:null,y:null};
			this.configure(Conf);
			this.pointer = null;
			this.reverse = null;

			// Graphics
			this.sprite = null;
			this.spriteX = null;
			this.spriteY = null;

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
			this.init = function(pos, reverse) {
				this.reverse = reverse;
				this.pos = pos;

				// set sprite
				this.sprite = new Image();
				this.sprite.src = Conf.sprite;
				this.spriteY = Conf.positionY;
				this.spriteX = Conf.positionX;
				this.sprite.width = Conf.width;
				this.sprite.height = Conf.height;
			}

			this.action = function() {
				Boilerplate.getManager('Menu').getOne(0).functions.pause();
			}

		}

		ButtonPause.prototype = {
			name : "ButtonPause",
			update : function() {
				if (!Boilerplate.controller.standby) {
					var t = Boilerplate.input.touched(this);
					if( t.status == true ) {
						this.pointer = t.pointer;
						this.action();
						this.spriteY = Conf.positionYPressed;
					}
					else {
						this.spriteY = Conf.positionY;
					}
				}
			},
			render : function() {
				if (this.reverse === true)  {
					Boilerplate.scene.ctx.save();
					Boilerplate.scene.ctx.scale(-1,-1);
					Boilerplate.scene.ctx.drawImage(this.sprite, this.spriteX, this.spriteY, this.size.x, this.size.y, (this.pos.x*-1)-this.size.x, (this.pos.y*-1)-this.size.y, this.size.x, this.size.y);
					Boilerplate.scene.ctx.restore();
				}
				else {
					Boilerplate.scene.ctx.drawImage(this.sprite, this.spriteX, this.spriteY, this.size.x, this.size.y, this.pos.x, this.pos.y, this.size.x, this.size.y);
				}
			}
		}

		return ButtonPause;
	}
);