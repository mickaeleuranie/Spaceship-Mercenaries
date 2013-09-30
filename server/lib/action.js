exports.Action = function() {
	var Action = {
		initPlayerId: function(client) {
			var data = {
				action: 'initPlayerId',
				client: {
					id: client.id,
					playerId: client.playerId
				}
			};
			
			GLOBAL.message.sendToClient(client, data);
		},
		waitingForPlayer: function(pool) {
			var data = {
				action: 'waitingForPlayer'
			};
			
			GLOBAL.message.sendToPool(pool, data);
		},
		startGame: function(pool) {
			var data = {
				action: 'startGame'
			};
			
			GLOBAL.message.sendToPool(pool, data);
		},
		move: function(client, params) {
			var data = {
				client: {
					id: client.id,
					playerId: client.playerId
				},
				action: 'move',
				params: {
					x: params.x
				}
			};
			
			GLOBAL.message.sendToPool(client.pool, data);
		},
		laser: function(client, params) {
			var data = {
				client: {
					id: client.id,
					playerId: client.playerId
				},
				action: 'laser'
			};
			
			GLOBAL.message.sendToPool(client.pool, data);
		},
		rocket: function(client, params) {
			var data = {
				client: {
					id: client.id,
					playerId: client.playerId
				},
				action: 'rocket'
			};
				
			GLOBAL.message.sendToPool(client.pool, data);
		},
		shield: function(client) {
			var data = {
				client: {
					id: client.id,
					playerId: client.playerId
				},
				action: 'shield'
			};
			
			GLOBAL.message.sendToPool(client.pool, data);
		},
		quit: function(client) {
			// seek pool and give the winner !!
			var data = {
				client: {
					id: client.id,
					playerId: client.playerId
				},
				action: 'quit'
			};
			
			var pool = client.pool;
			client.close();
			GLOBAL.message.sendToPool(pool, data);
		}
	};
	
	return Action;
};