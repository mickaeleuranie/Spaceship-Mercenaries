define(["core/manager", "multiplayer"], function(Manager, Multiplayer) {
	var MultiplayerManager = new Manager(Multiplayer);

	MultiplayerManager._init = MultiplayerManager.init;

	MultiplayerManager.init = function() {
		this._init(1);
	}
	return MultiplayerManager;
});