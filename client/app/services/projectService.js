angular.module('resumeApp').service('projectService', function(){
	var service = {};

	var projects = [
		{	
			'name': 'ProsePair I/O',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'ProsePair I/O is a real-time web application that connects either a pair of users or group of users in an instance wherein the users collaborate on prompted piece of writing within set parameters. Users may interact with one another beyond the "prose arena" via a realtime polling system.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum tellus congue libero vestibulum, ac bibendum risus ornare. Donec tristique erat vel purus faucibus vestibulum. Sed ullamcorper tortor sed urna sodales hendrerit. Fusce malesuada, justo non iaculis ultrices, nulla.'
					]
				},{
					'name':'Technical Overview',
					'body':[
						'Neque sodales ex, tempor feugiat libero urna consequat sem. Pellentesque non urna quam. Quisque euismod interdum cursus. Etiam venenatis id dui at dapibus. Nam egestas ultricies convallis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin mauris lorem, lacinia id mattis eu, lobortis quis mi. Sed ut cursus justo.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum tellus congue libero vestibulum, ac bibendum risus ornare. Donec tristique erat vel purus faucibus vestibulum. Sed ullamcorper tortor sed urna sodales hendrerit. Fusce malesuada, justo non iaculis ultrices, nulla.'
					]
				}
			],
			'technology':
				{
					'name': 'Runtime',
					'Runtime': [
						'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png'
					]
				},
			'source': 'https://github.com/Philip-Cheek/prosepairIO',
			'type': 'Solo ~ For Public',
			'status': 'Deployed',
			'deployment':{
				'status':true,
				'link': 'http://www.prosepair.io/',
				'type': 'Deployed Site'
			},
			'gallery': [
				'https://s3.amazonaws.com/prosepair/Screen+Shot+2016-10-05+at+4.20.50+PM.png',
			],
			'stack': [
				'Node.js',
				'AngularJS',
				'MongoDB'
			]
		},{
			'name': 'Test Project',
			'components':[
				{
					'name': 'Intro',
					'body': [
						'ProsePair I/O is a real-time web application that connects either a pair of users or group of users in an instance wherein the users collaborate on prompted piece of writing within set parameters. Users may interact with one another beyond the "prose arena" via a realtime polling system.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum tellus congue libero vestibulum, ac bibendum risus ornare. Donec tristique erat vel purus faucibus vestibulum. Sed ullamcorper tortor sed urna sodales hendrerit. Fusce malesuada, justo non iaculis ultrices, nulla.'
					]
				},{
					'name':'Technical Overview',
					'body':[
						'ProsePair was borne out of a desire to produce a polished application that allowed real time interaction between users. The idea of prompting users to write a story with one another, alternating either sentence by sentence or word by word, actually came from a similar game that would be played across message boards. The constraints inheret to most internet forums (page refreshing and whatnot), however seemed to work to the game\'s detriment. However, modern web applications need not suffer from the same constraints that older websites have faced. In addition, the single-threaded architecture of Node.js allowed me to easily create a manager that would either place users with one another in rooms or place them in an appropriate queue, all without breaking the bank on server capacity to handle all of the concurrent processes in a manner which would not burden the user with noticeable wait time.',
						'The application needed to be fast and server maintenence had to be cheap. Therefore a lot of processes were carried out in the front end, including the instance logic. Angular JS was an excellent ally in this regard.',
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque condimentum tellus congue libero vestibulum, ac bibendum risus ornare. Donec tristique erat vel purus faucibus vestibulum. Sed ullamcorper tortor sed urna sodales hendrerit. Fusce malesuada, justo non iaculis ultrices, nulla.'
					]
				}
			],
			'technology':
				{
					'name': 'Runtime',
					'Runtime': [
						'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/AngularJS_logo.svg/695px-AngularJS_logo.svg.png'
					]
				},
			'source': 'https://github.com/Philip-Cheek/prosepairIO',
			'type': 'Solo ~ For Public',
			'status': 'Deployed',
			'deployment':{
				'status':true,
				'link': 'http://www.acentre.com/graphics/tsnet_project_home_page_s.gif',
				'type': 'Deployed Site'
			},
			'gallery': [
				'http://www.acentre.com/graphics/tsnet_project_home_page_s.gif',

			],
			'stack': [
				'Node.js',
				'AngularJS',
				'MongoDB'
			],
			'open': false
		}
	];

	var open = [];

	service.getFullProjects = function(){
		return projects;
	}

	service.getProjectNames = function(){
		var pNames = [];
		console.log('called')
		for (var i = 0; i < projects.length; i ++){
			pNames.push(projects[i].name);
		}

		return pNames;
	};

	service.openProject = function(name, callback){
		var index;
		var openProjects = [];

		for (var i = 0; i < projects.length; i ++){
			if (name == projects[i].name){
				projects[i].open = !projects[i].open;
			}

			if (projects[i].open){
					service.addOpen(projects[i].name);
			}else{
				service.removeOpen(projects[i].name);
				console.log(open);
			}
		}
	}

	service.monitorOpen = function(){
		return open;
	}

	service.removeOpen = function(name){
		for (var i = 0; i < open.length; i++){
			if (open[i] == name){
				open.splice(i, 1);
				console.log('gotcya open', open);
				break;
			}
		}
	}

	service.addOpen = function(name){
		for (var i = 0; i < open.length; i++){
			if (name == open[i]){
				break;
			}
		}

		if (i == open.length){
			open.push(name);
		}
	}

	return service;
});