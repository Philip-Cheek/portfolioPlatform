angular.module('resumeApp').service('physicsService', function(){
	//persistent service data
	var service = {}, 
		objects = {},
		constraints = [];

	//globals
	var main, home, canvas, engine, mouseConstraint;

	//matterJS engine variables
	var Engine = Matter.Engine, World = Matter.World,
	    Body = Matter.Body, Bodies = Matter.Bodies,
	    Common = Matter.Common, Composites = Matter.Composites,
	    MouseConstraint = Matter.MouseConstraint, 
	    Constraint = Matter.Constraint;

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
		setRenderOptions();
		Engine.run(engine);
	};

	service.clear = function(){
		World.clear(engine.world)
		Engine.clear(engine);
		clearCanvas();
	}

	service.updateWorldQueue = function(){
		var oQueue = [],
			cQueue = [];

		for (var key in objects){
			var element = objects[key];
			if (!element.world){
				oQueue.push(element.obj);
				objects[key].world = false;
			}
		}
		World.add(engine.world, oQueue);

		for (var i = constraints.length - 1; i >= 0; i--){
			cQueue.push(constraints.pop());
		}

		World.add(engine.world, cQueue);
	}

	service.addConstraint = function(body, x, y){
		constraints.push(Constraint.create({
			bodyA: objects[body].obj,
			pointB: {
				x:x
				,y:y
			}
		}));
	};

	service.addCircle = function(key, radius, coord, spriteRender, density){
		if (!density){
			density = 1;
		}

		var options = {
			visible: false,
	        isStatic: false,
	        density: density,
	        restitution: .8,
        	friction: 1.01,
		};	

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
	}

	service.addRectangle = function(key, dimen, coord, spriteRender, density){
		if (!density){
			density = 1;
		}

		var options = {
			visible: false,
	        isStatic: false,
	        density: density,
	        restitution: .8,
        	friction: 1.01,
		};	

		if (spriteRender){
			options.render = {
				'strokeStyle': '#333333',
				'sprite': spriteRender
			}
		}
		objects[key] = {
			'world': false,
			'obj': Bodies.rectangle(coord.x, coord.y, dimen.width, dimen.height, options)
		}
	}

	function setWalls(screen){
		var offset = 20,
		    options = {
		    	isStatic: true,
		        render: {
		            visible: true
		        }
		    }

		return [
			Bodies.rectangle(screen.width/2, -(1500), screen.width, 1, options),
			Bodies.rectangle(screen.width/2, screen.height - 10 ,screen.width, 1, options),
			Bodies.rectangle(0, screen.height/2, 1, screen.height, options),
			Bodies.rectangle(screen.width, screen.height/2, 1, screen.height, options),
		]
	}

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
		callback({
			'height': dimensions.height,
			'width': dimensions.width
		});
	}

	function setRenderOptions(){
		var renderOptions = engine.render.options;

		renderOptions.background = 'none';
		renderOptions.showAngleIndicator = false;
		renderOptions.wireframes = false;
		renderOptions.showCollsions = false;
		renderOptions.showVelocity = false;
	}

	function setCanvas(screen){
		canvas = document.getElementById('canvas');
		canvas.style.height = screen.height;
		canvas.style.width = screen.width * .975;
		canvas.style.display = 'initial'
	}

	function clearCanvas(){
		var context = canvas.getContext('2d');
		context.clearRect(0,0, canvas.height, canvas.width);
		canvas.style.display= 'none';
	}

	function grabDomElements(){
		main = document.getElementById('main');
		home = document.getElementById('sHome');
	}


	return service;
});