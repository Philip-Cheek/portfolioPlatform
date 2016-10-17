angular.module('resumeApp').service('physicsService', function(){
	//persistent service data
	var service = {}, 
		screen = {}, 
		objects = {},
		defOptions = {

		};

	//globals
	var main = document.getElementById('main'),
		canvas, engine;

	//matterJS engine variables
	var Engine = Matter.Engine, World = Matter.World,
	    Body = Matter.Body, Bodies = Matter.Bodies,
	    Common = Matter.Common, Composites = Matter.Composites,
	    MouseConstraint = Matter.MouseConstraint,

		
	//creates environment
	service.init = function(){
		setDimensions();
		setCanvas();

		engine = createEngine();
		engine.world.bodies = [];

		var mouseConstraint = MouseConstraint.create(engine);
		World.add(engine.world, mouseConstraint, setWalls());
	};

	//run the engine
	service.run = function(){
		Engine.run(engine);
	};

	service.updateObjectQueue = function(){
		for (var item in object){
			if !(object[item].world){
				World.add(object[item].world);
				object[item].world = true;
			}
		}
	}

	service.createContraint = function(body, x, y){
		return Constraint.create({bodyA: objects[body], pointB: {x:x, y:y}});
	};

	service.addCircle = function(key, radius, coord, spriteRender){
		var options = defOptions;

		if (spriteRender){
			options.render = {
				'strokeStyle': '#333333',
				'sprite': spriteRender
			}
		}
		object[key] = {
			'world': false,
			'obj': Bodies.circle(coord.x, coord.y, radius, options);
		}

		if ('render' in defOptions){
			delete defOptions.render;
		}
	}

	service.addRectangle = function(key, dimen, coord, spriteRender){
		var options = defOptions;

		if (texture){
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

	function setWalls(){
		var offset = 20,
		    options = { 
		        isStatic: true,
		        render: {
		            visible: true
		        }
		    };

		return [
			Bodies.rectangle(screenWidth/2, 0, screenWidth, 1, options),
		    Bodies.rectangle(400, screenHeight + 25, 800.5 + 2 * offset, 50.5, options),
		    Bodies.rectangle(800 + offset, 300, 50.5, 600.5 + 2 * offset, options),
		    Bodies.rectangle(-offset, 300, 50.5, 600.5 + 2 * offset, options)
		]
	}


	function createCircle(key){
		objects[key] = 
	}


	function createEngine(){
		return Engine.create(
			document.body, {
				render: {
				canvas: canvas,
				options: {
				  showAngleIndicator: true,
				  wireframes: true,
				  width: screen.width,
				  height: screen.height
				}
			}
		);
	}


	function setDimensions(){
		var dimensions = main.getBoundingRect();
		screen.height = dimensions.height;
		screen.width = dimensions.width;
	}

	function setCanvas(){
		canvas = document.getElementById('main');
		canvas.height = screen.height;
		canvas.width = screen.width;
	}


	return service;
});