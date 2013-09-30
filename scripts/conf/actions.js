/**
 * Actions configuration
 **/
define({
	maxDistance:0,
	"laser":{
		type:"attack",
		damage : 10,
		cost : 1,
		nb:1,
		color:'#EFEF',
		pos:{x:"center", y:10},
		size:{x:5, y:20},
		target:{x:0, y:"max"},
		speed:6,
		sound:"laser_1"
	},
	"rocket":{
		type:"attack",
		damage : 10,
		cost : 5,
		nb:3,
		color:'#FFF',
		pos:{x:0, y:10},
		size:{x:5, y:20},
		target:{x:0, y:"max"},
		speed:4,
		sound:"laser_2"
	},
	"shield":{
		type:"defense",
		img:null,
		damage : 5,
		cost : 1,
		nb:1,
		color:'#FFF',
		pos:{x:"center", y:"center"},
		size:{x:170, y:50},
		target:{x:0, y:0},
		speed:0,
		sound:"shield"
	}
});