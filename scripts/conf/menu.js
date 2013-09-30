/**
 * Menu configuration
 **/
define({
	// Define different screens of menus
	firstScreen : 'main_menu',
	pauseScreen : 'pause_menu',
	gameOverScreen : 'gameover_menu',
	containerID : 'menu_container',
	screens : [
		{
			id:  'settings_menu',
			title: 'Settings',
			buttons: [
				{
					id: 'return',
					text: 'Return',
					action: 'load_main_menu'
				},
				{
					id: 'sound',
					text: 'Sound On',
					action: 'toggle_sound',
					datas: {
						'data-off' : 'Sound Off',
						'data-on' : 'Sound On'
					}
				},
				{
					id: 'music',
					text: 'Music On',
					action: 'toggle_music',
					datas: {
						'data-off' : 'Music Off',
						'data-on' : 'Music On'
					}
				}
			]
		},
		{
			id:  'gameover_menu',
			title: 'Game Over',
			buttons: [
				{
					id: 'exit',
					text: 'Exit',
					action: 'reload'
				},
				{
					id: 'replay',
					text: 'Replay',
					action: 'replay'
				}
			]
		},
		{
			id:  'mode_menu',
			title: 'Game mode',
			buttons: [
				{
					id: 'return',
					text: 'Return',
					action: 'load_main_menu'
				},
				{
					id: 'versus',
					text: 'Versus',
					action: 'load_versus_menu'
				},
				{
					id: 'one_player',
					text: 'One player',
					action: function() {log('One player mode')}
				}
			]
		},
		{
			id:  'versus_menu',
			title: 'Game mode',
			buttons: [
				{
					id: 'return',
					text: 'Return',
					action: 'load_mode_menu'
				},
				{
					id: 'online',
					text: 'Online',
					action: 'play_online'
				},
				{
					id: 'local',
					text: 'Local',
					action: 'play'
				}
			]
		},
		{
			id:  'pause_menu',
			title: 'Pause Menu',
			buttons: [
				{
					id: 'exit',
					text: 'Exit',
					action: 'reload'
				},
				{
					id: 'settings',
					text: 'Settings',
					action: 'load_settings_menu'
				},
				{
					id: 'resume',
					text: 'Resume',
					action: 'resume'
				}
			]
		},
		{
			id:  'main_menu',
			title: '<span style="line-height: 1.2em;">Spaceship<br />Mercenaries</span>',
			buttons: [
				{
					id: 'exit',
					text: 'Exit',
					action: function() { log('Exit'); }
				},
				{
					id: 'settings',
					text: 'Settings',
					action: 'load_settings_menu'
				},
				{
					id: 'play',
					text: 'Play',
					action: 'load_mode_menu'
				}
			]
		}
	]
});