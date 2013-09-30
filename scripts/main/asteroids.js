define(['core/boilerplate', 'conf/asteroids'],
	function(Boilerplate, Conf) {

		/*Define 'core/boilerplate' dependency to access Boilerplate*/
		// Boilerplate.help();

		var Asteroids = function() {
			this.pos = { x : 0, y : 0 };
			this.size = { x : 0, y : 0 };
			this.image = null;
			this.angle = 0;
			this.rotation = 0;
			this.rotationSpeed = 0;

			this.init = function()
			{
				var nb = randi(1, 9);
				this.image = new Image();
				this.image.src = 'images/asteroid_' + nb + '.png';
				this.image.onload = (function() {
					this.size.x = this.image.width;
					this.size.y = this.image.height;
				}).bind(this);

				this.pos.x = randi(0, Boilerplate.scene.width);
				this.pos.y = randi(0, Boilerplate.scene.height);

				this.speed = .5 * (nb*.1);
				this.angle = randi(Math.random(), Math.PI * 2);
				this.rotationSpeed = rand(.005, .007);
			}
		};

	    Asteroids.prototype = {
	    	name : 'Asteroids',
			update : function()
			{
				this.pos.x += Math.cos(this.angle) * this.speed;
				this.pos.y += Math.sin(this.angle) * this.speed;

				if (this.pos.x > Boilerplate.scene.canvas.width) {
					this.pos.x = -this.size.x;
				}

				if (this.pos.y > Boilerplate.scene.canvas.height) {
					this.pos.y = -this.size.y;
				}

				if (this.pos.x + this.size.x < 0) {
					this.pos.x = Boilerplate.scene.canvas.width;
				}

				if (this.pos.y + this.size.y < 0) {
					this.pos.y = Boilerplate.scene.canvas.height;
				}

				this.rotation += this.rotationSpeed;

				// Rendering
				this.render();
			},

			render : function()
			{
				var ctx = Boilerplate.scene.ctx;

				ctx.save();
				ctx.translate(this.pos.x + this.size.x * .5, this.pos.y + this.size.y * .5);
				ctx.rotate( this.rotation );
				ctx.drawImage(this.image, -this.size.x * .5, -this.size.y * .5, this.size.x, this.size.y);
				ctx.restore();
			}
		};

		return Asteroids;
	}
);