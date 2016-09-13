angular.module('resumeApp').controller('menuController', function($scope, $location, cardService, routeService){
	var listeners = {};

	$scope.menuItems = [
		{
			'name': 'Home',
			'selected': false,
			'path': '',
			'subItems': []
		},
		{
			'name': 'Projects',
			'selected': false,
			'path': 'projects',
			'subItems': []
		},
		{
			'name': 'Contact',
			'selected': false,
			'path': 'contact',
			'subItems': []
		}
	];

	init();

	$scope.linkClicked = function(item){
		if (!item.selected){
			console.log(item.name)
			for (var i = 0; i < $scope.menuItems.length; i++){

				if ($scope.menuItems[i].name == item.name){
					$location.path('/' + $scope.menuItems[i].path);
					break;
				}

			}
		}
	}

	$scope.selectSub = function(sub){
		sub.selected = !sub.selected;
		sub.callback(sub.name);
		console.log(sub)
	}

	function init(){
		cardService.toggleCardServices($location.url() == '/');
		routeService.enableRouteWatch($scope.menuItems);
	}
	
});