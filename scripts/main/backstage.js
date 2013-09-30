define(['core/boilerplate', 'conf/backstage'],
	function(Boilerplate, Conf) {

		/*Define 'core/boilerplate' dependency to access Boilerplate*/
		// Boilerplate.help();

		var Backstage = function() {
			this.pos = { x : 0, y : 0 };
			this.size = { x : 0, y : 0 };

			this.type = 'warrior';
			this.speed = .5;
			this.angle = Math.PI * .25;
			this.canRotate = false;
			this.rotation = 0;
			this.image = null;
			this.imageWarrior = null;
			this.imageAsteroid = null;

			this.init = function()
			{
				this.imageWarrior = new Image();
				this.imageWarrior.src = Conf.types['warrior'].img;

				this.imageAsteroid = new Image();
				this.imageAsteroid.src = Conf.types['asteroid'].img;

				this.imageWarrior.onload = (function()
				{
					if (this.type === 'warrior')
					{
						this.image = this.imageWarrior;
						this.size.x = this.imageWarrior.width;
						this.size.y = this.imageWarrior.height;
						this.pos.x = -this.size.x;
						this.pos.y = -this.size.y;
					}
				}).bind(this);

				this.imageAsteroid.onload = (function()
				{
					if (this.type === 'asteroid')
					{
						this.image = this.imageAsteroid;
						this.size.x = this.imageAsteroid.width;
						this.size.y = this.imageAsteroid.height;
						this.pos.x = -this.size.x;
						this.pos.y = -this.size.y;
					}
				}).bind(this);

				// initial type which will be used is "warrior" (it will change when out of screen)
				this.canRotate = Conf.types[ this.type ].canRotate;
			}
		};

	    Backstage.prototype = {
	    	name : 'BackStage',
			update : function()
			{
				this.pos.x += Math.cos(this.angle) * this.speed;
				this.pos.y += Math.sin(this.angle) * this.speed;

				if (this.pos.x > Boilerplate.scene.canvas.width) {
					this.resetPosition();
				}

				if (this.pos.y > Boilerplate.scene.canvas.height) {
					this.resetPosition();
				}

				if (this.pos.x + this.size.x < 0) {
					this.resetPosition();
				}

				if (this.pos.y + this.size.y < 0) {
					this.resetPosition();
				}

				if (this.type === 'asteroid')
					this.rotation += .001;

				// Rendering Backstage
				this.render();
			},

			render : function()
			{
				var ctx = Boilerplate.scene.ctx;

				ctx.save();
				ctx.translate(this.pos.x + this.size.x * .5, this.pos.y + this.size.y * .5);
				ctx.rotate( this.canRotate ? this.rotation : this.angle );
				ctx.drawImage(this.image, -this.size.x * .5, -this.size.y * .5, this.size.x, this.size.y);
				ctx.restore();
				// ctx.fillStyle = 'white';
				// ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			},

			resetPosition : function()
			{
				// Changing image (warrior/asteroid)
				if (this.type === 'warrior')
				{
					this.image = this.imageAsteroid;
					this.type = 'asteroid';
					this.canRotate = Conf.types[ this.type ].canRotate;

					this.size.x = this.imageAsteroid.width;
					this.size.y = this.imageAsteroid.height;
					this.pos.x = -this.size.x;
					this.pos.y = -this.size.y;
				}
				else if (this.type === 'asteroid')
				{
					this.image = this.imageWarrior;
					this.type = 'warrior';
					this.canRotate = Conf.types[ this.type ].canRotate;

					this.size.x = this.imageWarrior.width;
					this.size.y = this.imageWarrior.height;
					this.pos.x = -this.size.x;
					this.pos.y = -this.size.y;
				}

				var rd = Math.random();

				if (rd < .5)
				{
					this.pos.x = -this.size.x;
					this.pos.y = -this.size.y;
					this.angle = rand(.0785, Math.PI * .5 - .0785);
				}
				else if (rd >= .5)
				{
					this.pos.x = Boilerplate.scene.canvas.width;
					this.pos.y = Boilerplate.scene.canvas.height;
					this.angle = rand(Math.PI + .0785, 3 * (Math.PI *.5) - .0785);
				}
			}
		};

		return Backstage;
	}
);