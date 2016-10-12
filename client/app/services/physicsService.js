angular.module('resumeApp').service('physicsService', function(){
	var service = {},
		screen = {},
		main = document.getElementById('main'),
		Engine = Matter.Engine,
	    World = Matter.World,
	    Body = Matter.Body,
	    Bodies = Matter.Bodies,
	    Common = Matter.Common,
	    Composites = Matter.Composites,
	    MouseConstraint = Matter.MouseConstraint,
		canvas;
		

	service.init = function(){
		setDimensions();
		setCanvas();

		var engine = setEngine();
		var mouseConstraint = MouseConstraint.create(engine);
		World.add(engine.world, mouseConstraint);


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

	function SetEngine(){
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