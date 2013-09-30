/**
 * Default configuration
 **/
define({
	// Configure scene
	scene: {
		id		: 'scene',
		width 	: window.innerWidth,
		height	: window.innerHeight
	},
	verbose: false,
	swipeMaxTime : 150, // (JM) Timing maximal autorisé pour la prise en compte d'un 'swipe'
	TIMING : 0 // Timing du RequestAnimationFrame
});