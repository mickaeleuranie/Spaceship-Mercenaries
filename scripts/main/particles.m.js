define(["core/manager", "particles", 'conf/particle'], function(Manager, Particles, Conf) {
	var ParticlesManager = new Manager(Particles);

	ParticlesManager._update = ParticlesManager.update;

	ParticlesManager.update = function()
	{
		ParticlesManager._update();
	}
	return ParticlesManager;
});