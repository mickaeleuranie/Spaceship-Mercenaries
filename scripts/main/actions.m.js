define(["core/manager", "actions"], function(Manager, Actions) {
	var ActionsManager = new Manager(Actions);

	ActionsManager.getByType = function(type) {
		
		return ActionsManager;
	}

	ActionsManager.reload = function() {
		for(var iE = 0, cE = this.entities.length; iE < cE; iE++) {
			var entity = this.entities[iE];
			entity.load();
		}
	}
	
	return ActionsManager;
});