angular.module('resumeApp').controller('menuController', 
['$scope', '$location', 'cardService', 'routeService', 'imageService',
function($scope, $location, cardService, routeService, imageService){

	var listeners = {};

	$scope.menuItems = [
		{
			'name': 'Home',
			'selected': false,
			'path': '',
			'subItems': []
		},{
			'name': 'Skills',
			'selected': false,
			'path': 'skills',
			'subItems': []
		},{
			'name': 'Projects',
			'selected': false,
			'path': 'projects',
			'subItems': []
		},{
			'name': 'Contact',
			'selected': false,
			'path': 'contact',
			'subItems': []
		},{
			'name': 'About',
			'selected': false,
			'path': 'about',
			'subItems': []
		}
	];

	init();

	$scope.linkClicked = function(item){
		if (!item.selected){
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
	}

	function init(){
		cardService.toggleCardServices($location.url() == '/');
		routeService.enableRouteWatch($scope.menuItems);
		imageService.loadCache();
	}
	
}]);