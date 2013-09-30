define(['core/boilerplate', 'conf/particle'],
	function(Boilerplate, Conf) {
		var Particle = function() {

			this.pos = {
				x : 0,
				y : 0
			};
			this.size = {
				x : 0,
				y : 0
			};
			this.speed = 0;
			this.angle = Conf.angle;
			this.luminance = 0;

			this.init = function() {
				// Random position
				this.pos.x = randi(0, Boilerplate.scene.canvas.width);
				this.pos.y = randi(0, Boilerplate.scene.canvas.height);

				// Random size
				var size = rand(.5, 3);
				this.size.x = size;
				this.size.y = size;

				// Speed depends on size
				this.speed = size * .35;

				// Luminance depends on size
				this.luminance = (this.speed * 100) / (3 * .35) | 0;
			}
		};

		Particle.prototype = {
			name : "Particle",

			update : function() {
				// this.pos.x += this.speed;
				this.pos.x += Math.cos(this.angle) * this.speed;
				this.pos.y += Math.sin(this.angle) * this.speed;

				this.angle += .001;

				if (this.pos.x > Boilerplate.scene.canvas.width)
					this.pos.x = 0;

				if (this.pos.x < 0)
					this.pos.x = Boilerplate.scene.canvas.width;

				if (this.pos.y > Boilerplate.scene.canvas.height)
					this.pos.y = 0;

				if (this.pos.y < 0)
					this.pos.y = Boilerplate.scene.canvas.height;

				// Rendering a particle
				this.render();
			},
			render : function() {
				Boilerplate.scene.ctx.fillStyle = 'hsl(0, 0%, '+ this.luminance +'%)';
				Boilerplate.scene.ctx.fillRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
			},
		};

		return Particle;
	}
);
