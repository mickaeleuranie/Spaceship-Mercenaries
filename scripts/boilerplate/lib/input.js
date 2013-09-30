define(['lib/hand', 'conf/main'], function(hand, config) {

    var input = new Input();

	function onPointerDown( evt )
    {
    	var s = {
    		pointerId 	: evt.pointerId,
    		offsetX		: evt.offsetX,
    		offsetY		: evt.offsetY,
    		isReleased	: false
    	};
    	input.pointers.push(s);

    	input.swipes.push({
    		pointerId		: evt.pointerId,
    		swipeTimeStart 	: config.TIMING,
    		swipeFinished	: false,
    		initX 			: evt.offsetX,
    		initY 			: evt.offsetY,
    		currentX 		: evt.offsetX,
    		currentY 		: evt.offsetY
    	});

    	// console.log('> nb pointers : ' + input.pointers.length);
    	//console.log(s);
    }

    function onPointerMove( evt )
    {
    	for (var i = 0, c = input.swipes.length; i < c; i++)
    	{
    		var s = input.swipes[i];

    		//console.log(config.TIMING - s.swipeTimeStart + ' > '+ config.swipeMaxTime);
    		
    		if (s.pointerId !== evt.pointerId)
	    		continue;

	    	s.currentX = evt.offsetX;
	    	s.currentY = evt.offsetY;

	    	// Check if time's up
	    	if (config.TIMING - s.swipeTimeStart > config.swipeMaxTime) {
	    		// input.swipes.splice(i, 1);
	    		// c--;
	    		//console.log('swipe finished');
	    		s.swipeFinished = true;
	    	}
    	}
    }

    function onPointerUp( evt )
    {
    	for (var i = 0, c = input.pointers.length; i < c; i++)
    	{
    		var s = input.pointers[i];

    		if (s.pointerId !== evt.pointerId)
	    		continue;

	    	// input.pointers.splice(i, 1);
	    	// c--;
	    	s.isReleased = true;
	    	//console.log(s);
    	}

    	for (var i = 0, c = input.swipes.length; i < c; i++)
    	{
    		var s = input.swipes[i];

    		if (s.pointerId !== evt.pointerId)
	    		continue;

	    	// input.swipes.splice(i, 1);
	    	// c--;
	    	s.swipeFinished = true;
    	}
    }

	function Input()
	{
		this.canvas = null;
		this.pointers = [];
		this.swipes = [];

		/*
			swipe = {
				pointerId : i,
				swipeTimeStart : t,
				swipeFinished : false,
				initX : x,
				initY : y,
				currentX : x,
				currentY : y
			}
		*/

		this.init = function(canvas)
    	{
    		this.canvas = canvas;

    		this.canvas.addEventListener("pointerdown", 	onPointerDown, 	false);
		    this.canvas.addEventListener("pointermove", 	onPointerMove, 	false);
		    this.canvas.addEventListener("pointerup", 	onPointerUp, 	false);
		    // document.addEventListener("pointerout", 	onPointerUp, 	false);
		    // document.addEventListener("pointerenter", 	onPointerEnter, false);
		    // document.addEventListener("pointerleave", 	onPointerLeave, false);
		    // document.addEventListener("PointerOver", 	onPointerOver, 	false);

		    return this;
    	};

    	this.touched = function(obj)
    	{
            if ('object' !== typeof(obj) || obj.pos.x === null || obj.pos.y === null || obj.size.x === null || obj.size.y === null)
                return false;


    		if (this.pointers.length === 0)
    			return false;


    		for (var i = 0, c = this.pointers.length; i < c; i++)
    		{
    			if (this.pointers[i].isReleased)
    				continue;

    			var x = this.pointers[i].offsetX;
    			var y = this.pointers[i].offsetY;
    			
    			if (x >= obj.pos.x && x <= obj.pos.x + obj.size.x &&
    				y >= obj.pos.y && y <= obj.pos.y + obj.size.y)
    			{
    				return {
    					status : true,
    					pointer : this.pointers[i]
    				}
    			}
    		}

    		return false;
    	};

    	this.released = function(obj)
    	{
    		if ('object' !== typeof(obj) || obj.pos.x === null || obj.pos.y === null || obj.size.x === null || obj.size.y === null)
    			return false;

    		if (this.pointers.length === 0)
    			return false;

    		//console.log(this.pointers[0]);

    		for (var i = 0, c = this.pointers.length; i < c; i++)
    		{
    			//console.log(this.pointers[i]);
    			if (!this.pointers[i].isReleased)
    				continue;

    			var x = this.pointers[i].offsetX;
    			var y = this.pointers[i].offsetY;
    			
    			if (x >= obj.pos.x && x <= obj.pos.x + obj.size.x &&
    				y >= obj.pos.y && y <= obj.pos.y + obj.size.y)
    			{
    				return {
    					status : true,
    					pointer : this.pointers[i]
    				}
    			}
    		}

    		return false;
    	};

		/*
		** Example code
		* ------------
			var t = bp.input.touched(this);
	    	if (t.status){
	    		var boutonEvent = t.pointer;
	    		// Shield active
	    	}

	    	var ut = bp.input.released(this);
	    	if (t.status && boutonEvent == ut.pointer) {
	    		// Shield desactive
	    	}
    	*/

    	/**
    	 * Clean swipes which has ended or having they timer expired
    	**/
    	this.cleanSwipes = function()
    	{
    		for (var i = 0, c = this.swipes.length; i < c; i++)
    		{
    			var s = this.swipes[i];

    			if (s.swipeFinished) {
    				this.swipes.splice(i, 1);
    				c--;
    			}
    		}
    	};

    	/**
    	 * Clean pointers which are released
    	**/
    	this.cleanPointers = function()
    	{
    		for (var i = 0, c = this.pointers.length; i < c; i++)
    		{
    			var p = this.pointers[i];

    			if (p.isReleased) {
    				this.pointers.splice(i, 1);
    				c--;
    			}
    		}
    	};

    	this.swiped = function( obj )
    	{
    		if ('object' !== typeof(obj) || obj.pos.x === null || obj.pos.y === null || obj.size.x === null || obj.size.y === null)
    			return false;

    		if (this.swipes.length === 0)
    			return false;

    		for (var i = 0, c = this.swipes.length; i < c; i++)
    		{
    			var s = this.swipes[i];
    			var x = s.initX;
    			var y = s.initY;
    			
    			if (x >= obj.pos.x && x <= obj.pos.x + obj.size.x &&
    				y >= obj.pos.y && y <= obj.pos.y + obj.size.y)
    			{
    				// Si on est ici, c'est qu'on a bien swipé en commençant à la position de l'objet 'obj'
    				// On n'a plus qu'à vérifier si le swipe est relâché (ou fini) et en fonction de la dernière position,
    				//  si l'on a swipé vers la gauche ou vers la droite

    				if (!s.swipeFinished)
    					continue;

    				if (s.initX > s.currentX) {
    					return {
    						left : true,
    						right : false,
    						distance : s.initX - s.currentX
    					};
    				}

    				if (s.initX < s.currentX) {
    					return {
    						left : false,
    						right : true,
    						distance : s.currentX - s.initX
    					};
    				}
    			}
    		}

    		return { left : false, right : false };
    	}
    }

    return input;

});

// if (input.swipedLeftFrom( obj ))
// {
// 	obj.moveLeft();
// }