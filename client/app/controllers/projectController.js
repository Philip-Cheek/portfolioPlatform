angular.module('resumeApp').controller('projectController', function($scope){
	$scope.projects = [
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
			]
		}
	];
});