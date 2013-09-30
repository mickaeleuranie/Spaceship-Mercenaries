todo("Améliorer la suppression d'une entité.");
/*
 *	Define a manager template to deal with 
 *	simple/multiple instance of a model
 */
define(['core/boilerplate'],
	function(Boilerplate) {
		var Manager = function(Model) {
			// Create new manager
			this.model = Model;
			this.entities = [];
			// Define constructor methods
			this.init = function(cE) {

				for(var iE = 0; iE < cE; iE++) {
					this.entities.push(this.create());
				}

				if(Boilerplate.conf.verbose === true && this.entities.length) {
					log("@Manager : Initializing "+this.getOne(0).name+"Manager");
					if(this.entities.length === cE) {
						log("@Manager : Initialized "+cE+" "+p('entity', 'entities', cE)+" with success");
					}
				}
			}
		}
		
		// Define prototype methods
		Manager.prototype = {
			toString : function() {
				var model = ucfirst(this.model.prototype.name);

				return model + 'Manager' + o2s(this);
			},
			update : function() {
				for(var iE = 0, cE = this.entities.length; iE < cE; iE++) {
					var entity = this.entities[iE];
					if(typeof entity != 'undefined') {
						entity.update();
					}
				}
			},
			create : function() {
				var instance = new this.model();
				instance.init(this);
				return instance;
			},
			getOne : function(id) {
				var cEntity = this.entities.length;
				if(id >= cEntity) {
					warn("Your get request is out of perimeter : "+this.model.prototype.name+"Manager has only "+cEntity+" instance.");
				} else if(typeof this.entities[id] == "undefined") {
					warn(this.model.prototype.name+" instance with id ["+id+"] doesn't exist");
				} else {
					return this.entities[id];
				}
				return null;
			},
			deleteOne : function(id) {
				
				// Delete the id specified in parameter

				// Delete the animation property (if any)
				if (this.entities[i].animation)
					delete this.entities[i].animation;

				// Splice
				this.entities.splice(i, 1);

				return undefined;
			}
		}

		return Manager;
	}
);