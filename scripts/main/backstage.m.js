define(["core/manager", "backstage", "conf/backstage"], function(Manager, Backstage, Conf) {
	var BackstageManager = new Manager(Backstage);

	BackstageManager._update = BackstageManager.update;

	BackstageManager.update = function()
	{
		BackstageManager._update();
	}
	return BackstageManager;
});