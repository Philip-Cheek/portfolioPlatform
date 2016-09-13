angular.module('resumeApp').service('routeService', function($rootScope, $location, cardService, projectService){
	var service = {};
	var listeners = {};

	service.enableRouteWatch = function(menu){
		listeners.routeWatch = $rootScope.$watch(function(){
				return $location.url();
		}, function(newLocation){
			var location = newLocation.substring(1, $location.url().length);
			cardService.toggleCardServices(!location);

			for (var i = 0; i < menu.length; i++){
				menu[i].selected = menu[i].path == location;
			}

			customSub(location, menu);
		});
	}


	function customSub(location, menu){
		if (location == 'projects'){
			injectPSub(menu);

			listeners.customSub = $rootScope.$watch(function(){
				return projectService.monitorOpen()
			}, function(newVal, oldVal){
				if (newVal != oldVal){
					console.log('newVal', newVal)
					for (var i = 0; i < menu.length; i++){
						console.log(menu[i]);
						if (menu[i].name == 'Projects'){
							var pSub = menu[i].subItems;
							for (var iTwo = 0; iTwo < pSub.length; iTwo++){
								var change = false;

								for (var x = 0; x < newVal.length; x++){
									if (pSub[iTwo].name == newVal[x]){
										change = true;
									}
								}

								console.log('name, man', pSub[iTwo].name);
								pSub[iTwo].selected = change;
							}
						}
					}
				}
			}, true);

		}else{
			console.log(location);
			if ('customSub' in listeners){
				console.log('stop listening');
				listeners.customSub();
			}
		};
	}
	

	function injectPSub(menu){
		var pNames = projectService.getProjectNames();

		for (var i = 0; i < menu.length; i++){
			if (menu[i].name == 'Projects'){
				var projects = menu[i];
				if (projects.subItems.length != pNames.length){

					for (var iTwo = 0; iTwo < pNames.length; iTwo++){

						projects.subItems.push({
							'name': pNames[iTwo],
							'selected': false,
							'callback': projectService.openProject
						});
					}
				}
			}
		}

	}

	return service;
});