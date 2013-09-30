define(['core/boilerplate', 'gauge', 'button', 'buttonPause'],
	function(Boilerplate, Gauge, Button, ButtonPause) {
		var Hud = function() {

			this.gauge = null;
			this.buttons = new Array();
			this.buttonsPause = new Array();
			this.playerId = null
			this.reverse = false;	// hub orentation (inverse for opponent)

			this.init = function(HubManager) {
				this.playerId = HubManager.entities.length;
				this.reverse = (this.playerId % 2 == 0) ? false : true;
				this.initGauge();
				this.initButtons();
			}

			/**
			 * start with full health
			 */
			this.initGauge = function() {
				this.gauge = new Gauge();
				this.gauge.init(this.playerId, this.reverse);
			}

			/**
			 * start with 3 buttons
			 * - shield
			 * - attack
			 * - bonus
			 */
			this.initButtons = function() {
				
				var actions = [
					'attackPrimary',
					'shield',
					'attackSecondary'
				];

				var marginLeft = Boilerplate.scene.width - (actions.length * 50);
				var margin = 12;
				var initPosLeft = marginLeft * .5 - margin;

				for(var iA = 0, cA = actions.length; iA < cA; iA++) {
					// Create button
					var button = new Button();
					// Set position
					var pos = {
						x : initPosLeft + (margin * iA) + (50 * iA),
						y : Boilerplate.scene.height-button.size.y - button.margin,
					};

					// Reverse
					if(this.reverse === true) {
						pos.y = button.margin;
					}

					// Initialize button
					button.init(this.playerId, actions[iA], 1, pos, this.reverse);

					// Add button
					this.buttons.push(button);
				}


				// Init buttons pause first player
				var button = new ButtonPause();
				var pos = {
					x: 0,
					y: Boilerplate.scene.height-button.size.y - button.margin
				}
				button.init(pos, false);
				this.buttonsPause.push(button);
				// Init buttons pause second player
				var button = new ButtonPause();
				var pos = {
					x: Boilerplate.scene.width-button.size.x,
					y: 0
				}
				button.init(pos, true);
				this.buttonsPause.push(button);
			}

			this.enableButtons = function() {
				for (var i = this.buttons.length - 1; i >= 0; i--) {
					this.buttons[i].enabled = true;
				};
			}

			this.disableButtons = function() {
				for (var i = this.buttons.length - 1; i >= 0; i--) {
					this.buttons[i].enabled = false;
				};
			}

		}

		Hud.prototype = {
			name : "Hud",
			update : function() {

				// update gauge
				this.gauge.update();

				// update buttons
				for(var iE = 0, cE = this.buttons.length; iE < cE; iE++) {
					var entity = this.buttons[iE];
					if(typeof entity != 'undefined') {
						entity.update();
					}
				}

				// update buttons pause
				for(var iE = 0, cE = this.buttonsPause.length; iE < cE; iE++) {
					var entity = this.buttonsPause[iE];
					if(typeof entity != 'undefined') {
						entity.update();
					}
				}

				this.render();
			},
			render : function() {

				// render gauge
				this.gauge.render();

				// render buttons
				if(!(Boilerplate.controller.isMultiplayerMode && this.reverse)) {
					for(var iE = 0, cE = this.buttons.length; iE < cE; iE++) {
						var entity = this.buttons[iE];
						if(typeof entity != 'undefined') {
							entity.render();
						}
					}
				}

				// render buttons pause
				for(var iE = 0, cE = this.buttonsPause.length; iE < cE; iE++) {
					var entity = this.buttonsPause[iE];
					if(typeof entity != 'undefined') {
						entity.render();
					}
				}
			}
		}

		return Hud;
	}
);