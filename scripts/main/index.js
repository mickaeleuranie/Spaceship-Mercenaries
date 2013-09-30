/*Define require configuration paths*/
requirejs.config({
    "paths"	: {
		"core"	: 	"../boilerplate/core",
		"lib"	: 	"../boilerplate/lib",
		"buzz"	: 	"../boilerplate/lib/buzz",
		"misc"	: 	"../boilerplate/misc",
		"conf"	: 	"../conf"
    },
    shim 	: {
    	buzz 	: 	{
    		exports 	: "buzz",
    		deps 		: []
    	}
    }
});

/*Main page*/
require(['core/boilerplate', 'game'], function (Boilerplate, Game) {
	// Initialize boilerplate
	Boilerplate.init(Game);
});