GLOBAL.gameInfo = require('./lib/gameinfo').GameInfo();
GLOBAL.clientInstance = require('./lib/client');
GLOBAL.poolInstance = require('./lib/pool');
GLOBAL.utils = require('./lib/utils').Utils();
GLOBAL.action = require('./lib/action').Action();
GLOBAL.message = require('./lib/message').Message();
GLOBAL.gameLoop = require('./lib/gameloop').GameLoop();

// config
var config = {
	host : '10.243.41.52',
	port : 5050
};

var WebSocketServer = require('ws').Server;
var server = new WebSocketServer(config);

console.log('Server created on ' + server.options.host + ':' + server.options.port + '! \\o/');

server.on('connection', function(websocket) {
	
	var client = GLOBAL.clientInstance.Client().init(websocket);
	
	console.log('--- CLIENT CONNECTION ---');
	console.log('Client #' + client.id  + ' is connected');
	
	console.log('--- GAME INFOS ---');
	console.log('Current players: ' + gameInfo.currentPlayers() + '/' + gameInfo.maxPlayers);
	console.log('Current pools: ' + gameInfo.currentPools());
	
	websocket.on('message', function(data) {
		var client = GLOBAL.clientInstance.Client().getByWebSocket(websocket);
		message.receive(client, data);
	});

	websocket.on('close', function() {
		GLOBAL.clientInstance.Client().close(websocket);
	});
});

setInterval(function() {
	GLOBAL.gameLoop.loop();
}, 10);