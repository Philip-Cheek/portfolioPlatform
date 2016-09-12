angular.module('resumeApp').controller('menuController', function($scope, $location, cardService){
	$scope.menuItems = [
		{
			'name': 'Home',
			'selected': false,
			'path': ''
		},
		{
			'name': 'Projects',
			'selected': false,
			'path': 'projects'
		},
		{
			'name': 'Contact',
			'selected': false,
			'path': 'contact'
		}
	];

	cardService.toggleCardServices($location.url() == '/');

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

	$scope.$watch(function(){
		return $location.url();
	}, function(newLocation){
		var location = newLocation.substring(1, $location.url().length);
		cardService.toggleCardServices(!location);

		for (var i = 0; i < $scope.menuItems.length; i++){
			$scope.menuItems[i].selected = $scope.menuItems[i].path == location;
		}
	});

	
});