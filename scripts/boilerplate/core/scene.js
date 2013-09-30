/*
 *	Build scene with canvas
 */
define(function() {
	var Scene = function(SceneConf) {
		// Initialize scene according to configuration
		for(property in SceneConf) {
			this[property] = SceneConf[property];
		}
		
		// Create Canvas
		this.canvas = document.createElement('canvas');
		// Configure it
		this.canvas.id = SceneConf.id;
		this.canvas.width = this.width;
		this.canvas.height = this.height;

		// Add it to page
		var body = document.getElementsByTagName("body")[0];
		body.appendChild(this.canvas);

		// Get context for canvas
		this.ctx = this.canvas.getContext('2d');
	}

	return Scene;
});