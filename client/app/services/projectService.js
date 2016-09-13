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