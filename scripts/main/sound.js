define(['core/boilerplate', 'buzz'], 
	function(Boilerplate, buzz) {
		var Sound = function() {

			this.init = function() {
				// Initialize Sound
			};

		};

		Sound.prototype = {
			name : "Sound",
			update : function() {
				//debug('Sound is running');
				// Update Sound objects
				if (!Boilerplate.controller.cfgGame.sound) {
					this.bSound.mute();
				}
			},
			play : function(fadeIn, loop, type) {
				if (!this.isPaused() && type == "sound")
					this.stop(false);

				if ((type == "sound" && Boilerplate.controller.cfgGame.sound) || (type == "music" && Boilerplate.controller.cfgGame.music)) {
					this.bSound.play();
					if (fadeIn)
						this.bSound.fadeIn();
					if (loop)
						this.bSound.loop();
				}

				if (type == "music") {
					Boilerplate.getManager('Sound').conf.current_theme = this;
				}
			},
			isPaused : function() {
				return this.bSound.isPaused();
			},
			stop : function(fadeOut) {
				if (fadeOut)
					this.bSound.fadeOut(function() {this.stop();});
				else
					this.bSound.stop();
			},
			togglePlay : function(fadeOut) {
				if (fadeOut)
					this.bSound.fadeOut(function() {this.togglePlay();});
				else
					this.bSound.togglePlay();
			},
			load : function(File, Formats) {
				this.bSound = new buzz.sound(File, {formats: Formats});
				this.bSound.load();
			}
		}

		return Sound;
	}
);