exports.Client = function() {
	var Client = {
		id : null,
		pool: null,
		websocket: null,
		playerId: null, // for browser
		init : function(websocket) {
			
			this.id = GLOBAL.utils.md5(websocket.upgradeReq.headers['sec-websocket-key']);
			this.websocket = websocket;
			this.pool = GLOBAL.poolInstance.Pool().findForClient(this);
			this._initPlayerId();
			
			GLOBAL.action.initPlayerId(this);
			GLOBAL.gameInfo.addClient(this);
			
			if(this.pool.clients.length < GLOBAL.gameInfo.playersPerPool) {
				GLOBAL.action.waitingForPlayer(this.pool);
			} else {
				GLOBAL.action.startGame(this.pool);
			}
				
			return this;
		},
		_initPlayerId: function() {
			var iterationPlayerId = 0;
			var playerIds = [];
			for(var i in this.pool.clients) {
				playerIds[iterationPlayerId] = this.pool.clients[i].playerId;
				iterationPlayerId++;
			}
			for(var i = 0; i < GLOBAL.gameInfo.playersPerPool; i++) {
				if(playerIds.indexOf(i) === -1) {
					this.playerId =  i;
					break;
				}
			}
			
			if(this.playerId === null) {
				this.playerId = 0;
			}
		},
		getByWebSocket: function(websocket) {
			var key = GLOBAL.utils.md5(websocket.upgradeReq.headers['sec-websocket-key']);
			
			for(var i in GLOBAL.gameInfo.clients) {
				if(GLOBAL.gameInfo.clients[i].id == key) {
					return GLOBAL.gameInfo.clients[i];
				}
			}
			
			return null;
		},
		close: function(websocket) {
			
			var key = GLOBAL.utils.md5(websocket.upgradeReq.headers['sec-websocket-key']);
			
			// remove associated pool
			for(var i in GLOBAL.gameInfo.pools) {
				for(var j in GLOBAL.gameInfo.pools[i].clients) {
					if(GLOBAL.gameInfo.pools[i].clients[j].id == key) {
						GLOBAL.gameInfo.pools[i].clients.splice(j, 1);
						
						if(GLOBAL.gameInfo.pools[i].clients.length === 0) {
							GLOBAL.gameInfo.pools.splice(i, 1);
						}
					}
				}
			}
			
			// remove client
			for(var i in GLOBAL.gameInfo.clients) {
				if(GLOBAL.gameInfo.clients[i].id == key) {
					GLOBAL.gameInfo.clients.splice(i, 1);
				}
			}
		}
	};
	
	return Client;
};
