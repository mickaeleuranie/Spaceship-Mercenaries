define(
	['misc/tools', 'conf/main', 'conf/game', 'conf/menu', 'lib/input', 'core/scene'],
	function(Tools, cfgMain, cfgGame, cfgMenu, Input, Scene) {

		var Boilerplate = function() {
			this.init = function(Controller) {

				this.getHelp();

				// Initialize default configuration (conf/main.js)
				this.conf = cfgMain;
				// Initialize menu configuration (conf/menu.js)
				this.cfgMenu = cfgMenu;

				// Initialize Scene
				this.scene = new Scene(cfgMain.scene);
				// Initialize inputs with canvas as target
				this.input = Input.init(this.scene.canvas);
				// Initialize controller
				this.controller = new Controller(cfgGame, cfgMenu);

				this.controller.init();

				this.run();
			}
		}

		Boilerplate.prototype = {
			getHelp: function() {
				log("### Your HTML5 canvas boilerplate is now running");
				log("  - Declare 'core/boilerplate' dependency in your modules to access Boilerplate");
				log("  - Enter MyObject.help() to get information about it")
			},
			run: function( t ) {
				// Reinitialize debug console
				$('#debug').childNodes[1].innerHTML = "";

				// Execute game loop only if game is running
				if(this.controller.stop === false) {
					// Update game controller
					this.controller.update();

					// Update timing
					this.conf.TIMING = t;

					// Call game loop again
					requestAnimationFrame(this.run.bind(this));
				}
			},
			setStop: function(stop) {
				// Stop/start controller
				this.controller.stop = stop;
				// If start controller
				if(stop === false) {
					// Relaunch game loop
					this.run();
				}
			},
			setPause: function(pause) {
				// Pause/resume controller
				this.controller.pause = pause;
				this.setStop(pause);
			},
			getManager : function(Model) {
				if(this.controller[Model+"Manager"] !== undefined) {
					return this.controller[Model+"Manager"];
				} else {
					warn("Game doesn't have "+Model+"Manager.");
				}
			}
		};

		return new Boilerplate();
	}
);