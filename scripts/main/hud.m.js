define(["core/manager", "hud"], function(Manager, Hud) {
	var HudManager = new Manager(Hud);

	HudManager.getGaugeByPlayer = function(id) {
		for(var iE = 0, cE = this.entities.length; iE < cE; iE++) {
			var entity = this.entities[iE];
			if(entity.playerId === id) {
				return entity.gauge;
			}
		}

		return null;
	}

	HudManager.reload = function() {
		for(var iE = 0, cE = this.entities.length; iE < cE; iE++) {
			var entity = this.entities[iE];
			entity.disableButtons();
			entity.gauge.init(entity.playerId, entity.reverse);
		}
	}

	return HudManager;
});