/**
 * Gauge configuration
 **/
define({
	sprite : {
		energy : {
			src : "images/energy.png",
			size : {width: 31, height: 168},
		},
		gauge : {
			src : "images/gauge.png",
			size : {width : 92, height : 13},
			top : {
				pos : {x : 30, y : 0},
				size : {width : 31, height : 13}
			},
			bottom : {
				pos : {x : 0, y : 0},
				size : {width : 31, height : 13}
			},
			split : {
				pos : {x : 61, y : 0},
				size : {width : 30, height : 13}
			}
		}
	},
	margin : 0,
	marginHeight : 40
});