exports.Message = function() {
	var Message = {
		sendToClient: function(client, data) {
			var dataToString = GLOBAL.utils.object2String(data);
			client.websocket.send(dataToString);
		},
		sendToPool: function(pool, data) {
			if(pool != null) {
				var dataToString = GLOBAL.utils.object2String(data);
				for(var i in pool.clients) {
					pool.clients[i].websocket.send(dataToString);
				}
			}
		},
		receive: function(client, data) {
			var messageObj = utils.string2Object(data);
			
			if(client != null) {
				if(typeof GLOBAL.action[messageObj.action] !== 'undefined') {
					GLOBAL.action[messageObj.action](client, messageObj.params);
				}
				else {
					this._error('Action: ' + messageObj.action + ' not implemented...');
				}
			}
			else {
				this._error('Client not found...');
			}
		},
		error: function(message) {
			console.log('[Err] message: '+ message);
		},
	};
	
	return Message;
};