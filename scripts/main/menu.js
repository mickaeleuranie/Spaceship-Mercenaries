define(['core/boilerplate'],
	function(Boilerplate) {
		var Menu = function() {

			this.conf = Boilerplate.cfgMenu;
			var containerID = this.containerID = this.conf.containerID;
			this.container = null;

			this.functions = {
				load_main_menu : function() {
					if (Boilerplate.controller.pause) {
						addClass($('.menu_item'), 'hide');
						removeClass($('#pause_menu'), 'hide');
					}
					else {
						var SoundManager = Boilerplate.getManager('Sound');
						var Sound = SoundManager.conf.sounds['select'];
						Sound.object.play(false, false, 'sound');

						addClass($('.menu_item'), 'hide');
						removeClass($('#main_menu'), 'hide');
					}
				},
				load_settings_menu : function() {
					var SoundManager = Boilerplate.getManager('Sound');
					var Sound = SoundManager.conf.sounds['select'];
					Sound.object.play(false, false, 'sound');

					addClass($('.menu_item'), 'hide');
					removeClass($('#settings_menu'), 'hide');
				},
				load_mode_menu : function() {
					var SoundManager = Boilerplate.getManager('Sound');
					var Sound = SoundManager.conf.sounds['select'];
					Sound.object.play(false, false, 'sound');

					addClass($('.menu_item'), 'hide');
					removeClass($('#mode_menu'), 'hide');
				},
				load_versus_menu : function() {
					var SoundManager = Boilerplate.getManager('Sound');
					var Sound = SoundManager.conf.sounds['select'];
					Sound.object.play(false, false, 'sound');

					addClass($('.menu_item'), 'hide');
					removeClass($('#versus_menu'), 'hide');
				},
				resume : function() {
					Boilerplate.setPause(false);
					addClass($('#'+containerID), 'hide');
					addClass($('.menu_item'), 'hide');
					if (Boilerplate.controller.cfgGame.music) {
						SoundManager = Boilerplate.getManager('Sound');
						SoundManager.conf.current_theme.togglePlay(false);
					}
				},
				pause : function() {
					Boilerplate.setPause(true);
					Boilerplate.input.pointers = [];
					SoundManager = Boilerplate.getManager('Sound');
					if (!SoundManager.conf.current_theme.isPaused()) 
						SoundManager.conf.current_theme.togglePlay(false);

					removeClass($('#'+containerID), 'hide');
					addClass($('.menu_item'), 'hide');
					removeClass($('#pause_menu'), 'hide');
				},
				play : function() {
					SoundManager = Boilerplate.getManager('Sound');
					SoundManager.conf.current_theme.stop(false);
					Music = SoundManager.conf.musics['theme_game'];
					Music.object.play(true, true, 'music');

					Boilerplate.setStop(false);
					addClass($('#'+containerID), 'hide');
					addClass($('.menu_item'), 'hide');

					// Create Menu Container
					var countdown = document.createElement('p');
					// Configure it
					countdown.id = 'countdown';
					countdown.innerHTML = Boilerplate.controller.countdown;

					// Add it to page
					var body = document.getElementsByTagName("body")[0];
					body.appendChild(countdown);
				},
				play_online	: function() {
					
					// play() copy
					SoundManager = Boilerplate.getManager('Sound');
					SoundManager.conf.current_theme.stop(false);
					Music = SoundManager.conf.musics['theme_game'];
					Music.object.play(true, true, 'music');

					Boilerplate.setStop(false);
					Boilerplate.run();
					addClass($('#'+containerID), 'hide');
					addClass($('.menu_item'), 'hide');
					
					// Create Menu Container
					var countdown = document.createElement('p');
					// Configure it
					countdown.id = 'countdown';
					countdown.innerHTML = Boilerplate.controller.countdown;

					// Add it to page
					var body = document.getElementsByTagName("body")[0];
					body.appendChild(countdown);
					// -----
					
					Boilerplate.getManager('Multiplayer').init();
					Boilerplate.controller.isMultiplayerMode = true;
				},
				reload 	: function() {
					addClass($('.menu_item'), 'hide');
					removeClass($('#'+containerID), 'hide');
					removeClass($('#'+Boilerplate.cfgMenu.firstScreen), 'hide');
					Boilerplate.controller.reload();
				},
				replay : function() {
					Boilerplate.getManager('Menu').getOne(0).functions.reload();
					Boilerplate.getManager('Menu').getOne(0).functions.play();
				},
				toggle_music : function() {
					var SoundManager = Boilerplate.getManager('Sound');
					var Sound = SoundManager.conf.sounds['select'];
					Sound.object.play(false, false, 'sound');

					if (!Boilerplate.controller.cfgGame.music) {
						if (this.getAttribute('data-on'))
							this.innerHTML = this.getAttribute('data-on');
						Boilerplate.controller.cfgGame.music = true;
					}
					else if (Boilerplate.controller.cfgGame.music) {
						if  (this.getAttribute('data-off'))
							this.innerHTML = this.getAttribute('data-off');
						Boilerplate.controller.cfgGame.music = false;
					}

					if (!Boilerplate.controller.pause)
						SoundManager.conf.current_theme.togglePlay(false);
				},
				toggle_sound : function() {
					if (!Boilerplate.controller.cfgGame.sound) {
						if (this.getAttribute('data-on'))
							this.innerHTML = this.getAttribute('data-on');
						Boilerplate.controller.cfgGame.sound = true;
					}						
					else if (Boilerplate.controller.cfgGame.sound) {
						if  (this.getAttribute('data-off'))
							this.innerHTML = this.getAttribute('data-off');
						Boilerplate.controller.cfgGame.sound = false;
					}
				}
			};

			this.init = function() {
				// Initialize Menu

				// Create Menu Container
				this.container = document.createElement('div');
				// Configure it
				this.container.id = this.containerID;
				this.container.style.width = Boilerplate.scene.width+'px';
				this.container.style.height = Boilerplate.scene.height+'px';
				addClass(this.container, 'menu');

				// Add it to page
				var body = document.getElementsByTagName("body")[0];
				body.appendChild(this.container);

				// Create each screen of menu
				for (var i = this.conf.screens.length - 1; i >= 0; i--) {
					var conf = this.conf.screens[i];
					var menu = document.createElement('div');
					menu.id = conf.id;
					// Title
					var title = document.createElement('h1');
					title.innerHTML = conf.title;
					addClass(title, 'title');
					menu.appendChild(title);
					// Buttons
					for (var j = conf.buttons.length - 1; j >= 0; j--) {
						var button = document.createElement('p');
						button.id = conf.buttons[j].id;
						button.innerHTML = conf.buttons[j].text;
						var action = conf.buttons[j].action;
						if (isFunction(action))
							button.onclick = action;
						else
							button.onclick = this.functions[action];
						addClass(button, 'btn');
						// Datas
						if (conf.buttons[j].datas) {
							for (x in conf.buttons[j].datas) {
								if (!isFunction(conf.buttons[j].datas[x]))
									button.setAttribute(x, conf.buttons[j].datas[x]);
							}
						}

						menu.appendChild(button);
					};

					// Show only first screen
					addClass(menu, 'menu_item');
					if (this.conf.firstScreen != menu.id)
						addClass(menu, 'hide');
					this.container.appendChild(menu);
				};
			}
		}

		Menu.prototype = {
			name : "Menu",
			update : function() {
				// debug('Menu is running');
				// Update Menu objects
				this.render();
			},
			render : function() {
				// Render Menu
				// drawRect(Boilerplate.scene.ctx,"rgba(0,0,0,.8)",0,0,Boilerplate.scene.width,Boilerplate.scene.height);
			}
		}

		return Menu;
	}
);