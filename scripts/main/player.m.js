define(["core/manager", "player"], function(Manager, Player) {
	var PlayerManager = new Manager(Player);

	PlayerManager._init = PlayerManager.init;
	PlayerManager.init = function(cE) {
		this._init(cE);
	}

	PlayerManager.getPos = function(id) {
		var player = this.getOne(id);
		return {
			pos : player.pos,
			size : player.size,
			target : player.target,
			collider : player.collider
		}
	}

	PlayerManager.reload = function() {
		for(var iE = 0, cE = this.entities.length; iE < cE; iE++) {
			var entity = this.entities[iE];
			entity.load();
		}
	}

	return PlayerManager;
});