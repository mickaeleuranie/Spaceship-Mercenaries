/**
 * Sound configuration
 **/
define({
	// Define different musics and sounds
	current_theme : null,
	musics: {
		theme_menu : {
			object 	: null,
			track 	: 'sounds/theme',
			format 	: ['mp3'],
			loop 	: true,
			fadeIn 	: true
		},
		theme_game : {
			object 	: null,
			track 	: 'sounds/battle',
			format 	: ['mp3'],
			loop 	: true,
			fadeIn 	: true
		}
	},
	sounds: {
		select : {
			object 	: null,
			track 	: 'sounds/select',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		laser_1 : {
			object 	: null,
			track 	: 'sounds/laser_1',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		laser_2 : {
			object 	: null,
			track 	: 'sounds/laser_2',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		explosion_1 : {
			object 	: null,
			track 	: 'sounds/explosion_1',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		explosion_2 : {
			object 	: null,
			track 	: 'sounds/explosion_2',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		shield : {
			object 	: null,
			track 	: 'sounds/shield_2',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		},
		shield_hit : {
			object 	: null,
			track 	: 'sounds/shield_hit',
			format 	: ['wav'],
			loop 	: false,
			fadeIn 	: false
		}
	}
});