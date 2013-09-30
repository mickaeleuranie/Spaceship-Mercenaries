define(["core/manager", "asteroids", "conf/asteroids"], function(Manager, Asteroids, Conf) {
	var AsteroidsManager = new Manager(Asteroids);

	AsteroidsManager._update = AsteroidsManager.update;

	AsteroidsManager.update = function()
	{
		AsteroidsManager._update();
	}
	return AsteroidsManager;
});