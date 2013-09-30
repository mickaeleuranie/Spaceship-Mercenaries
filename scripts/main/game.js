define(['lib/input', 'particles.m', 'asteroids.m', 'hud.m', 'player.m', 'menu.m', 'actions.m', 'sound.m', 'backstage.m', 'multiplayer.m', 'core/boilerplate'],
	function(input, ParticlesManager, AsteroidsManager, HudManager, PlayerManager, MenuManager, ActionsManager, SoundManager, BackStageManager, MultiplayerManager, Boilerplate) {

		/*Define 'core/boilerplate' dependency to access Boilerplate*/
		// Boilerplate.help();

	    var Game = function(CfgGame, CfgMenu) {
			/*Construct Game Controler*/
			this.cfgGame = CfgGame;
			this.cfgMenu = CfgMenu;
			this.stop = this.cfgGame.stopOnStart;
			this.standby = true;
			this.pause = false;
			this.menu = MenuManager;
			this.currentTime = +new Date();
			this.countdown = this.cfgGame.countdown;
			this.isMultiplayerMode = false;
			this.multiplayerPlayerId = null;
		}

		Game.prototype = {
			init : function() {
				/*Initialize game managers*/
				ParticlesManager.init(50);
				AsteroidsManager.init(7);
				BackStageManager.init(1);
				PlayerManager.init(2);
				HudManager.init(2);
				MenuManager.init(1);
				ActionsManager.init(1);
				SoundManager.init(0);

				this.background = new Image();
				this.background.src = 'images/background-2.png';

				// Init main theme
				SoundManager.conf.current_theme = SoundManager.conf.musics.theme_menu.object;
				SoundManager.conf.current_theme.play(SoundManager.conf.musics.theme_menu.fadeIn, SoundManager.conf.musics.theme_menu.loop, 'music');
			},
			update : function() {
				// Countdown
				var countdown = $('#countdown');
				if (this.countdown > 0) {
					if (interval(this.currentTime, 1)) {
						this.currentTime = +new Date();
						this.countdown--;
						countdown.innerHTML = this.countdown;
					}
				}
				else if (this.countdown == 0) {
					countdown.innerHTML = 'Go !';
					if (interval(this.currentTime, 1)) {
						this.currentTime = +new Date();
						this.countdown--;
					}
				}
				else if (this.countdown == -1 && countdown !== undefined) {
					countdown.parentNode.removeChild(countdown);
					this.countdown = null;
					this.standby = false;
					for (var i = HudManager.entities.length - 1; i >= 0; i--) {
						HudManager.entities[i].enableButtons();
					};
				}

				// Clean canvas with black screen
				drawRect(Boilerplate.scene.ctx,"rgba(0,0,0,.2)",0,0,Boilerplate.scene.width,Boilerplate.scene.height);

				ParticlesManager.update();
				AsteroidsManager.update();

				// Draw planets
				Boilerplate.scene.ctx.drawImage(this.background, 0, 0, Boilerplate.scene.width, Boilerplate.scene.height);

				/*Game loop - Update game managers*/

				BackStageManager.update();
				PlayerManager.update();
				HudManager.update();

				// Reset inputs pointers && swipes
				//input.pointers = [];
				input.cleanPointers();
				input.cleanSwipes();

				MenuManager.update();
				ActionsManager.update();


			},
			pause : function() {
				removeClass($('#'+this.cfgMenu.containerID), 'hide');
				removeClass($('#'+this.cfgMenu.pauseScreen), 'hide');
				this.stop = true;
			},
			gameOver : function(playerID) {
				SoundManager.conf.current_theme.stop(false);
				SoundManager.conf.musics.theme_menu.object.play(false, SoundManager.conf.musics.theme_menu.loop, 'music');
				removeClass($('#'+this.cfgMenu.containerID), 'hide');
				removeClass($('#'+this.cfgMenu.gameOverScreen), 'hide');
				$('#'+this.cfgMenu.gameOverScreen+' .title').innerHTML = 'Player #'+(playerID)+' Win !';
				this.stop = true;
			},
			reload : function() {
				PlayerManager.reload();
				ActionsManager.reload();
				HudManager.reload();
				this.stop = false;
				this.pause = false;
				this.standby = true;
				this.countdown = this.cfgGame.countdown;
				input.cleanPointers();
				input.cleanSwipes();
			}
		}

		// Save Managers
		for(var iA = 0, cA = arguments.length; iA < cA; iA++) {
			// Get alias for argument
			var argument = arguments[iA];
			// Has model so is manager
			if(argument.model !== undefined) {
				var model = argument.model.prototype.name;
				Game.prototype[model+"Manager"] = argument;
			}
		}

		return Game;
	}
);