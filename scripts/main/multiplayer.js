define(['core/boilerplate', 'conf/multiplayer'],
	function(Boilerplate, Conf) {
		var Multiplayer = function() {
			
			// config
			this._host = Conf.host;
			this._port = Conf.port;
			
			this._websocket = null;
			
			this.init = function() {
				this.connection();
			};
			
			this.connection = function() {
				
				var multiplayer = this;
				
				this._websocket = new WebSocket('ws://' + this._host + ':' + this._port);
				
				// events
				this._websocket.onopen = function() {
					console.log('Connected!');
				};
				
				this._websocket.onmessage = function(content) {
					multiplayer._receive(content);
			    };
			    
			    this._websocket.onreadystatechange = function() {
			    	switch(multiplayer._websocket.readyState) {
				    	case WebSocket.CONNECTING :
			    			console.log('Websocket: connecting');
			    		break;
			    		
			    		case WebSocket.OPEN :
			    			console.log('Websocket: connection open');
			    		break;
			    		
			    		case WebSocket.CLOSING :
			    			console.log('Websocket: closing');
			    		break;
			    		
			    		case WebSocket.CLOSED :
			    			console.log('Websocket: connection closed');
			    		break;
			    	}
			    };
			};
			
			this._setPlayerId = function(playerId) {
				Boilerplate.controller.multiplayerPlayerId = playerId;
			};
			
			this._startGame = function() {
				if(this._websocket != null) {
					
				}
			};
			
			this._gameOver = function() {
				
			};

			/**
			 * Send an action to the server
			 * var action: string
			 * var params: object
			 */
			this.send = function(action, params) {
				if(this._websocket != null) {
					var data = {
						action: action
					};
					
					if(typeof params !== 'undefined') {
						data.params = params;
					}
					
					console.log('send action: ' + action);
					this._websocket.send(JSON.stringify(data));
				}
			};
			
			this._receive = function(content) {
				if(this._websocket != null) {
					var message = JSON.parse(content.data);
					switch(message.action) {
						case 'initPlayerId' :
							console.log('received: initPlayerId');
							this._setPlayerId(message.client.playerId);
						break;
						
						case 'waitingForPlayer' :
							console.log('received: waitingForPlayer');
						break;
						
						case 'startGame' :
							console.log('received: startGame');
							this._startGame();
						break;
						
						case 'move' :
							log('multiplayerId : ' + Boilerplate.controller.multiplayerPlayerId);
							log('local plyaerId : ' + Boilerplate.getManager('Player').getOne(0).id);
							log('sent from playerId : ' + message.client.playerId);
							
							if(message.client.playerId != Boilerplate.controller.multiplayerPlayerId) {
								Boilerplate.getManager('Player')
									.getOne(message.client.playerId)
									.moveTarget(message.params.x);
							}
						break;
						
						case 'laser' :
						case 'shield' :
						case 'rocket' :
							if(message.client.playerId != Boilerplate.controller.multiplayerPlayerId) {
								Boilerplate.getManager('Actions').getOne(0).launch(message.client.playerId, message.action);
							}
						break;
						
						case 'quit' :
							console.log('received: quit');
							this._gameOver();
						break;
						
						default :
						break;
					}
				}
			};
		};

		Multiplayer.prototype = {
			name: "Multiplayer"
		};

		return Multiplayer;
	}
);