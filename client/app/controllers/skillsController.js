angular.module('resumeApp').controller('skillsController', function($scope, physicsService){
	initPhysics();

	function initPhysics(){
		physicsService.init();
		physicsService.run();
		// addFallingSkills();
		// setMongoBridge();
		// physicsService.updateObjectQueue();
	}

	function addFallingSkills(){
		physicsService.addCircle('swift', 50, {
			'x': 220,
			'y': 0
		}, {
			'texture': './image/swiftball.png',
            'xScale': 50/107.5,
            'yScale': 50/107.5
		});

		physicsService.addCircle('sql', 70, {
			'x': 520,
			'y': 0
		}, {
			texture: './image/sqlng.png',
            xScale: 70/231.5,
            yScale: 70/231.5
		});
	}

	function setMongoBridge(){
		var h = physicsService.screen.height;
		var w = physicsService.screen.width;

		physicsService.addRectangle('mongo', {
			'width': 400,
			'height': 75
		}, {
			'x': w/2 - 100,
			'y': h - 100
		}, {
			texture: './image/mlogo.png'
		});
	}
});