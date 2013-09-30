exports.GameLoop = function() {
	var GameLoop = {
		_checkWaitingPlayers: function() {
			for(var i in GLOBAL.gameInfo.clients) {
				if(GLOBAL.gameInfo.clients[i].pool !== null) {
					if(GLOBAL.gameInfo.clients[i].pool.clients.length < 2) {
						
					}
				}
			}
		},
		loop: function() {
			this._checkWaitingPlayers();
		}
	};
	
	return GameLoop;
};