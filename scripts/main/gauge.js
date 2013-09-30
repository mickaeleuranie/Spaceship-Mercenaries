define(['core/boilerplate', 'conf/gauge', 'conf/player'],
	function(Boilerplate, Conf, ConfPlayer) {
		var Gauge = function() {

			this.name = "Gauge";

			this.value =  null;
			// this.pos = {x:10,y:50};
			this.pos = {x:null,y:null};
			this.playerId = null;
			this.reverse = false;
			this.energySplit = null;

			// Graphics
			this.sprite = null;
			this.spriteX = null;
			this.spriteY = null;
			this.reverse = false;

			this.setValue = function(value) {
				this.value = value;
			}

			this.setPlayerId = function(id) {
				this.playerId = id;
			}

			// initialize gauge
			this.init = function(playerId, reverse) {
				this.playerId = playerId;
				this.reverse = reverse;
				var value = this.getPlayerEnergy();
				this.value = value;
				this.energy = this.getPlayerEnergy();
				this.energySplit = this.getPlayerEnergySplit();
				this.pos = {
					x: Conf.sprite.gauge.top.size.width/2 + Conf.margin,
					y: Boilerplate.scene.height - Conf.sprite.energy.size.height - Conf.sprite.gauge.size.height - Conf.marginHeight
				};

				// Reverse
				if(this.reverse === true) {
					this.pos.x = Boilerplate.scene.width - Conf.margin - Conf.sprite.gauge.size.width/2;
					this.pos.y = Conf.sprite.gauge.size.height + Conf.marginHeight;
				}


				// set sprite
				this.sprite = new Image();
				this.sprite.src = Conf.sprite.energy.src;
				this.sprite.width = Conf.sprite.energy.size.width;
				this.sprite.height = Conf.sprite.energy.size.height;
				this.spriteX = 0;
				this.spriteY = 0;

				//set top gauge
				this.spriteTop = new Image();
				this.spriteTop.src = Conf.sprite.gauge.src;
				this.spriteTop.width = Conf.sprite.gauge.top.size.width;
				this.spriteTop.height = Conf.sprite.gauge.top.size.height;

				//set bottom gauge
				this.spriteBottom = new Image();
				this.spriteBottom.src = Conf.sprite.gauge.src;
				this.spriteBottom.width = Conf.sprite.gauge.bottom.size.width;
				this.spriteBottom.height = Conf.sprite.gauge.bottom.size.height;

				//set split gauge
				this.spriteSplit = new Image();
				this.spriteSplit.src = Conf.sprite.gauge.src;
				this.spriteSplit.width = Conf.sprite.gauge.split.size.width;
				this.spriteSplit.height = Conf.sprite.gauge.split.size.height;
			}

			this.getPlayerEnergy = function() {
				return Boilerplate.getManager('Player').getOne(this.playerId).energy;
			}

			this.getPlayerEnergySplit = function() {
				return Boilerplate.getManager('Player').getOne(this.playerId).energySplit;
			}

			this.addEnergy = function(value, energyMax) {
				this.energy += value;

				var height = this.energy * Conf.sprite.energy.size.height / energyMax;
				var diff = this.sprite.height - height;
				this.sprite.height = height;

				if(this.reverse === true) {
					this.spriteY += diff;
				} else {
					this.spriteY += diff;
					this.pos.y += diff;
				}
			}

			this.setEnergy = function(energy, energyMax) {

				var height = energy * Conf.sprite.energy.size.height / energyMax;
				var diff = this.sprite.height - height;
				this.sprite.height = height;


				if(this.reverse === true) {
					this.spriteY += diff;
				} else {
					this.spriteY += diff;
					this.pos.y += diff;
				}
			}

			this.setEnergySplit = function(energySplit) {
				this.energySplit = energySplit;
			}

			this.renderSpriteTop = function() {
				var step = Math.ceil(Conf.sprite.energy.size.height/ConfPlayer.energySplitMax);

				Boilerplate.scene.ctx.drawImage(
						this.spriteTop,
						Conf.sprite.gauge.top.pos.x,
						Conf.sprite.gauge.top.pos.y,
						this.spriteTop.width,
						(this.spriteTop.height),
						this.pos.x,
						(this.pos.y),
						this.spriteTop.width,
						this.spriteTop.height
					);
			}

			this.renderSpriteSplit = function() {
				var step = Math.ceil(Conf.sprite.energy.size.height/ConfPlayer.energySplitMax);
				var multiple = (this.reverse) ? -1 : 1;
				for(var i = 0; i < this.energySplit; i++) {
					Boilerplate.scene.ctx.drawImage(
						this.spriteSplit,
						Conf.sprite.gauge.split.pos.x,
						Conf.sprite.gauge.split.pos.y,
						this.spriteSplit.width,
						this.spriteSplit.height,
						this.pos.x,
						(this.pos.y+(i*step*multiple)),
						this.spriteSplit.width,
						this.spriteSplit.height
					);
				}
			}

		}

		Gauge.prototype = {
			update : function() {
				this.setValue(this.getPlayerEnergy());
			},
			render : function() {
				if(this.reverse === true) {
					Boilerplate.scene.ctx.save();
					Boilerplate.scene.ctx.scale(1,-1);
					Boilerplate.scene.ctx.drawImage(
						this.sprite,
						this.spriteX,
						this.spriteY,
						this.sprite.width,
						this.sprite.height,
						this.pos.x,
						this.pos.y*-1-this.sprite.height,
						this.sprite.width,
						this.sprite.height
					);

					// top & bottom of the gauge
					Boilerplate.scene.ctx.drawImage(
						this.spriteTop,
						Conf.sprite.gauge.top.pos.x,
						Conf.sprite.gauge.top.pos.y,
						this.spriteTop.width,
						this.spriteTop.height,
						this.pos.x,
						this.pos.y*-1-this.sprite.height,
						Conf.sprite.gauge.top.size.width,
						Conf.sprite.gauge.top.size.height
					);

					Boilerplate.scene.ctx.drawImage(
						this.spriteBottom,
						Conf.sprite.gauge.bottom.pos.x,
						Conf.sprite.gauge.bottom.pos.y,
						this.spriteBottom.width,
						(this.spriteBottom.height),
						this.pos.x,
						(this.pos.y*-1-this.spriteBottom.height),
						this.spriteBottom.width,
						this.spriteBottom.height
					);

					// drawRect(Boilerplate.scene.ctx, "rgb(255,255,255)",this.pos.x,this.pos.y*-1-this.sprite.height,this.sprite.width,this.sprite.height);
					Boilerplate.scene.ctx.restore();
				} else {

					// energy
					Boilerplate.scene.ctx.drawImage(
						this.sprite,
						this.spriteX,
						this.spriteY,
						this.sprite.width,
						(this.sprite.height),
						this.pos.x,
						this.pos.y,
						this.sprite.width,
						this.sprite.height
					);

					// top & bottom of the gauge
					this.renderSpriteTop();
					Boilerplate.scene.ctx.drawImage(
						this.spriteBottom,
						Conf.sprite.gauge.bottom.pos.x,
						Conf.sprite.gauge.bottom.pos.y,
						this.spriteBottom.width,
						(this.spriteBottom.height),
						this.pos.x,
						(this.pos.y+this.sprite.height-this.spriteBottom.height),
						this.spriteBottom.width,
						this.spriteBottom.height
					);

					// split of gauge
					this.renderSpriteSplit();
				}
			}
		}

		return Gauge;
	}
);