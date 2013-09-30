exports.GameInfo = function() {
	var GameInfo = {
		currentPlayers: function() {
			return this.clients.length;
		}, // number of current players (from successful connection to end of process)
		maxPlayers: 100, // number of max players all
		clients: [],
		pools: [],
		playersPerPool: 2,
		currentPools: function() {
			return this.pools.length;
		},
		addClient: function(client) {
			this.clients.push(client);
		},
		addPool: function(pool) {
			this.pools.push(pool);
		},
	};
	
	return GameInfo;
};