angular.module('resumeApp').controller('skillsController', function($scope, physicsService){

	$scope.skills = [{
		'type': 'Language',
		'entries': {
			'name': 'swift',
			'level': 'experienced',
			'physics': {'t': 'circle', 'n': 'swiftball', 'r': 50, 
				'c': [205, -350], 's': 50/107.5}
		}, {
			'name': 'javascript',
			'level': 'experienced',
			'physics': {'t': 'rectangle', 'n': 'javascript', 'w': 150 , 'h':150, 
				'c': [520, 0], 's': 150/300}
		},{
			'name': 'python',
			'level': 'experienced',
			'physics': {'t': 'rectangle', 'n': 'python', 'w': 120.4 , 'h':182.4, 
				'c': [220, 0], 's': .4}
		},{
			'name': 'python',
			'level': 'experienced',
			'physics': {'t': 'rectangle', 'n': 'python', 'w': 120.4 , 'h':182.4, 
				'c': [220, 0], 's': .4}
		}
	},{
		'type':'Database',
		'entries': {
			'name': 'MongoDB',
			'level': 'experienced',
		},{
			'name': 'MySql',
			'level': 'experienced',
			'physics': {'t': 'circle', 'n': 'sql', 'r': 70, 
				'c': [520, -300], 's': 70/231.5}
		}
	},{
		'type': 'Framework',
		'entries': {
			'name': 'AngularJS',
			'level': 'experienced'
		}
	}

	initPhysics();
	setLegibleLink();

	function initPhysics(){
		physicsService.init();
		physicsService.run();
		addFallingSkills();
		setMongoBridge();
		physicsService.updateWorldQueue();
	}

	function setMongoBridge(){
		var h = physicsService.screen.height;
		var w = physicsService.screen.width;

		physicsService.addRectangle('mongo', {
			'width': 400,
			'height': 75
		}, {
			'x': w/2,
			'y': h/1.3
		}, {
			texture: '../resources/images/mlogo.png'
		}, 2);

		physicsService.addConstraint('mongo', w/2 - 50, h - 20);
		physicsService.addConstraint('mongo', w/2 + 50, h-20);

	}

	function setLegibleLink(){
		var opacity = 0,
			link = document.getElementById('legib'),
			legib = window.requestAnimationFrame(legilize);
		
		window.cancelAnimationFrame(legib);
		function legilize(){
			console.log(opacity);
			link.style.opacity = opacity;
			if (opacity <= 1){
				window.requestAnimationFrame(legilize);
			};
			opacity += .007;
		}

		setTimeout(function(){
			legilize();
		}, 700)
	};


	function addFallingSkills(){
		// var circles = [
		// 	{'name': 'swiftball', 'r': 50, 'c': [220, -350], 's': 50/107.5},


		// }

		physicsService.addCircle('swiftball', 50, {
			'x': 220,
			'y': -350
		}, {
			'texture': '../resources/images/swiftball.png',
            'xScale': 50/107.5,
            'yScale': 50/107.5
		});

		physicsService.addCircle('sql', 70, {
			'x': 520,
			'y': -300
		}, {
			texture: '../resources/images/sqlng.png',
            xScale: 70/231.5,
            yScale: 70/231.5
		});

		
		physicsService.addRectangle('javascript', {
			'width': 150,
			'height': 150
		}, {
			'x': 520,
			'y': 0
		}, {
			texture: '../resources/images/javascript.png',
			xScale: 150/300,
        	yScale: 150/300
		});

		physicsService.addRectangle('python', {
			'width': 120.4,
			'height': 182.4
		}, {
			'x': 220,
			'y': 0
		}, {
			texture: '../resources/images/python.png',
			xScale: .4,
        	yScale: .4
		});

		physicsService.addRectangle('angular', {
			'width': 920 * .5,
			'height': 150 * .5
		}, {
			'x': 400,
			'y': -600
		}, {
			texture: '../resources/images/angular.png',
			xScale: .5,
        	yScale: .5
		});

		physicsService.addCircle('django', (348/2)*.5, {
			'x': 590,
			'y': -850
		}, {
			texture: '../resources/images/django.png',
            xScale: .5,
            yScale: .5
		});

		physicsService.addCircle('django', (348/2)*.5, {
			'x': 590,
			'y': -850
		}, {
			texture: '../resources/images/django.png',
            xScale: .5,
            yScale: .5
		});

		physicsService.addCircle('react', (256/2)*.5, {
			'x': 290,
			'y': -850
		}, {
			texture: '../resources/images/react.png',
            xScale: .5,
            yScale: .5
		});

		physicsService.addRectangle('html', {
			'width': 203 * .4,
			'height': 289 * .4
		}, {
			'x': 720,
			'y': -40
		}, {
			texture: '../resources/images/html.png',
			xScale: .4,
        	yScale: .4
		});

		physicsService.addRectangle('css', {
			'width': 213 * .4,
			'height': 289 * .4
		}, {
			'x': 320,
			'y': -890
		}, {
			texture: '../resources/images/css.png',
			xScale: .4,
        	yScale: .4
		});

		physicsService.addRectangle('git', {
			'width': 213 * .4,
			'height': 289 * .4
		}, {
			'x': 120,
			'y': -264,
		}, {
			texture: '../resources/images/git.png',
			xScale: .4,
        	yScale: .4
		});

		physicsService.addRectangle('flask', {
			'width': 120,
			'height': 74
		}, {
			'x': 205,
			'y': -420,
		}, {
			texture: '../resources/images/flask.png',
		});

		physicsService.addCircle('objectivec', 150 * .3, {
			'x': 605,
			'y': -320,
		}, {
			texture: '../resources/images/objectivec.png',
			xScale: .3,
        	yScale: .3
		});

		physicsService.addRectangle('socket', {
			'width': 394 * .3,
			'height': 134 * .3
		}, {
			'x': 245,
			'y': -620,
		}, {
			texture: '../resources/images/socket.png',
			xScale: .3,
        	yScale: .3
		});

		physicsService.addRectangle('socket', {
			'width': 394 * .3,
			'height': 134 * .3
		}, {
			'x': 245,
			'y': -620,
		}, {
			texture: '../resources/images/socket.png',
			xScale: .3,
        	yScale: .3
		});

		physicsService.addRectangle('ssh', {
			'width': 85,
			'height': 85
		}, {
			'x': 745,
			'y': -510,
		}, {
			texture: '../resources/images/ssh.png',
		});

		physicsService.addRectangle('node', {
			'width': 483 * .8,
			'height': 133 * .8
		}, {
			'x': 545,
			'y': -800,
		}, {
			texture: '../resources/images/node.png',
			xScale: .8,
        	yScale: .8
		});
		
	};

});