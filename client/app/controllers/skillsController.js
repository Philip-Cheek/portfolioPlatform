angular.module('resumeApp').controller('skillsController', function($scope, physicsService){

	var haltRequest = false;
	$scope.skills = [];
	$scope.view= 'Legible';
	
	setSkills();
	initPhysics();
	setLegibleLink();

	$scope.legibleToggle = function(){
		haltRequest = false;
		if ($scope.view == 'Legible'){
			$scope.view = 'Physics'
			physicsService.clear();
		}else{
			resetLegible();
			$scope.view = 'Legible'
			setSkills();
			initPhysics();
			setLegibleLink();
		}
	}

	function initPhysics(){
		physicsService.init();
		physicsService.run();
		addFallingSkills();
		setMongoBridge();
		physicsService.updateWorldQueue();
	}

	function setMongoBridge(){
		var h = physicsService.screen.height;
		var w = physicsService.screen.width * .95;

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
		physicsService.addConstraint('mongo', w/2 + 50, h - 20);

	}

	function resetLegible(){
		haltRequest = true;
		var linked = document.getElementById('legib');
		if (linked.style.opacity = 1){
			linked.style.opacity = 0;
		}
	}

	function setLegibleLink(){
		var opacity = 0,
			link = document.getElementById('legib'),
			legib = window.requestAnimationFrame(legilize);
		window.cancelAnimationFrame(legib);
		function legilize(){
			link.style.opacity = opacity;
			if (opacity <= 1 && !haltRequest){
				window.requestAnimationFrame(legilize);
			}else{
				if ($scope.view == 'Legible' && haltRequest){
					link.style.opacity = 0;
				}
				haltRequest = false;
			};
			opacity += .007;
		}

		setTimeout(function(){
			haltRequest = false;
			legilize();
		}, 700)
	};


	function addFallingSkills(){
		for (var type in $scope.skills){
			var skills = $scope.skills[type].entries
			for (var i = 0; i < skills.length; i++){
				if ('physics' in skills[i]){
					var p = skills[i].physics,
						tUrl = '../resources/images/' + p.n + '.png';

					if (p.t == 'circle'){
						physicsService.addCircle(p.n, p.r, {
							'x': p.c[0],
							'y': p.c[1]
						},{
							'texture': tUrl,
							'xScale': p.s,
							'yScale': p.s
						});
					}else if (p.t == 'rect'){
						physicsService.addRectangle(p.n,{
							'width': p.d[0],
							'height': p.d[1]
						},{
							'x': p.c[0],
							'y': p.c[1]
						},{
							'texture': tUrl,
							'xScale': p.s,
							'yScale': p.s
						})
					}
				}
			}
		}
	}

	function setSkills(){
		$scope.skills = [{
			'type': 'Languages',
			'entries': [{
				'name': 'Swift',
				'level': 'Experienced',
				'physics': {'t': 'circle', 'n': 'swiftball', 'r': 50, 
					'c': [205, -350], 's': 50/107.5}
			},{
				'name': 'Javascript',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'javascript', 'd': [150,150],
					'c': [540, 0], 's': 150/300}
			},{
				'name': 'Python',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'python', 'd': [120.4,182.4], 
					'c': [220, 0], 's': .4}
			},{
				'name': 'Objective C',
				'level': 'Apprentice',
				'physics': {'t': 'circle', 'n': 'objectivec', 'r': 150 *.3, 
					'c': [605, -320], 's': .3}
			}]
		},{
			'type':'Databases',
			'entries': [{
				'name': 'MongoDB',
				'level': 'Experienced',
			},{
				'name': 'MySql',
				'level': 'Experienced',
				'physics': {'t': 'circle', 'n': 'sqlng', 'r': 70, 
					'c': [520, -300], 's': 70/231.5}
		 	}]
		},{
			'type': 'Frameworks',
			'entries': [{
				'name': 'AngularJS',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'angular', 'd': [920 * .5, 150 * .5],
					'c': [400, -600], 's': .5}
			},{
				'name': 'Django',
				'level': 'Experienced',
				'physics': {'t': 'circle', 'n': 'django', 'r': (348/2)*.5,
					'c': [590, -850], 's': .5}
			},{
				'name': 'Flask',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'flask', 'd': [120, 74],
					'c': [205, -420], 's': 1}
			},{
				'name': 'Node.js (runtime)',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'node', 'd': [483 * .8, 133 * .8],
					'c': [545, -800], 's': .8}

			}]
		},{
			'type': 'Libraries',
			'entries': [{
				'name': 'React',
				'level': 'Apprentice',
				'physics': {'t': 'circle', 'n': 'react', 'r': (256/2)*.5, 
					'c': [290, -850], 's': .5}
			},{
				'name': 'Socket.IO',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'socket', 'd': [394 * .3, 134 * .3], 
					'c': [290, -850], 's': .3}
			}]
		},{
			'type': 'Misc.',
			'entries': [{
				'name': 'HTML',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'html', 'd': [203 * .4, 150 * .4],
					'c': [720, -40], 's': .4}
			},{
				'name': 'CSS',
				'level': 'Experienced',
				'physics': {'t': 'rect', 'n': 'css', 'd': [213 * .4, 150 * .4],
					'c': [320, -890], 's': .4}
			},{
				'name': 'Git',
				'level': 'Experience',
				'physics': {'t': 'rect', 'n': 'git', 'd': [241 * .4, 243 * .4],
				'c': [120, -264], 's': .4}
			}]

		}];
	}

});