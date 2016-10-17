angular.module('resumeApp').service('physicsService', function(){
	//persistent service data
	var service = {}, 
		objects = {},
		constraints,
		defOptions = {
			visible: false,
	        isStatic: false,
	        density: .5,
	        restitution: .8,
        	friction: 1.01,
		};

	//globals
	var main, home, canvas, engine, mouseConstraint;

	//matterJS engine variables
	var Engine = Matter.Engine, World = Matter.World,
	    Body = Matter.Body, Bodies = Matter.Bodies,
	    Common = Matter.Common, Composites = Matter.Composites,
	    MouseConstraint = Matter.MouseConstraint;


		
	//creates environment
	service.init = function(){
		var self = this;
		grabDomElements();
		setDimensions(function(screen){
			self.screen = screen;
			
			setCanvas(screen);

			engine = createEngine(screen);
			engine.world.bodies = [];

			mouseConstraint = MouseConstraint.create(engine);
			World.add(engine.world, mouseConstraint)
			World.add(engine.world, setWalls(screen));

		});
	};

	//run the engine
	service.run = function(){
		console.log('called')
		setRenderOptions();
		Engine.run(engine);
	};

	service.updateObjectQueue = function(){
		for (var item in objects){
			var element = objects[item].obj
			if (!objects[item].world && element){
				var element = (objects[item].obj)
				World.add(engine.world, element);
				objects[item].world = true;
			}
		}
	}

	service.addContraint = function(body, x, y){
		var c = 0,
			cParams = {};


		for (var key in constraints){
			if (key == body){
				break;
			}

			c++;
		}
		var letter = String.fromCharCode('A'.charCodeAt() + c);
		cParams.key = 'Body' + letter;
		cParams.pointB = {
			x: x,
			y: y
		}

		constraints[body] = Constraint.create(cParams);
	};

	service.addCircle = function(key, radius, coord, spriteRender){
		var options = defOptions;

		if (spriteRender){
			options.render = {
				'strokeStyle': '#333333',
				'sprite': spriteRender
			}
		}
		objects[key] = {
			'world': false,
			'obj': Bodies.circle(coord.x, coord.y, radius, options)
		}

		if ('render' in defOptions){
			delete defOptions.render;
		}
	}

	service.addRectangle = function(key, dimen, coord, spriteRender){
		var options = defOptions;

		if (spriteRender){
			options.render = {
				'strokeStyle': '#333333',
				'sprite': spriteRender
			}
		}

		objects[key] = Bodies.rectangle(coord.x, coord.y, dimen.h, dimen.w, options);

		if ('render' in defOptions){
			delete defOptions.render;
		}
	}

	function setWalls(screen){
		var offset = 20,
		    options = { 
		        isStatic: false,
		        render: {
		            visible: true
		        }
		    },
		    otherOptions = {
		    	isStatic: true,
		        render: {
		            visible: true
		        }
		    }

		return [
			Bodies.rectangle(200, 0, 50, 60, options),
			Bodies.rectangle(screen.width/2, screen.height - 10 ,screen.width, 10, otherOptions)
		]
	}


	// function createCircle(key){
	// 	objects[key] = 
	// }


	function createEngine(screen){
		return Engine.create(home, 
			{
				render: {
				canvas: canvas,
				options: {
				  showAngleIndicator: true,
				  wireframes: true,
				  width: screen.width,
				  height: screen.height
				}
			}
		});
	}


	function setDimensions(callback){
		var dimensions = main.getBoundingClientRect();
		console.log(dimensions)
		callback({
			'height': dimensions.height,
			'width': dimensions.width
		});
	}

	function setRenderOptions(){
		var renderOptions = engine.render.options;

		renderOptions.background = 'none';
		renderOptions.showAngleIndicator = false;
		renderOptions.wireframes = true;
		renderOptions.showCollsions = false;
		renderOptions.showVelocity = false;
	}

	function setCanvas(screen){
		canvas = document.getElementById('canvas');
		canvas.height = screen.height;
		canvas.width = screen.width;
	}

	function grabDomElements(){
		main = document.getElementById('main');
		home = document.getElementById('sHome');
	}


	return service;
});