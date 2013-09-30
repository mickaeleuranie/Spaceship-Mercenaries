exports.Pool = function() {
	var Pool = {
		id: null,
		currentPlayers: 0,
		maxPlayers: 0,
		clients: [],
		findForClient: function(client) {
			for(var i in GLOBAL.gameInfo.pools) {
				if(GLOBAL.gameInfo.pools[i].clients.length < GLOBAL.gameInfo.playersPerPool) {
					return gameInfo.pools[i]._join(client);
				}
			}
			
			return this._init(client);
		},
		
		_init: function(client) {
			this.id = guid();
			this.maxPlayers = GLOBAL.gameInfo.playersPerPool;
			this.currentPlayers = 1;
			this.clients.push(client);
			GLOBAL.gameInfo.addPool(this);
			
			return this;
		},
		
		_join: function(client) {
			this.currentPlayers++;
			this.clients.push(client);
			
			return this;
		},
		
		_destroy: function() {
			
		}
	};
	
	return Pool;
};

function s4() {
	return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
};

function guid() {
	return s4() + s4();
};