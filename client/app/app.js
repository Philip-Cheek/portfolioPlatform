angular.module('resumeApp', ['ngRoute'])
	.config(['$httpProvider','$routeProvider','$locationProvider', function($httpProvider, $routeProvider, $locationProvider){
		$routeProvider
            .when('/',{
                templateUrl: 'app/partials/home.html'
            })
            .when('/projects',{
            	templateUrl: 'app/partials/projects.html'
            })
            .when('/contact',{
                templateUrl: 'app/partials/contact.html'
            });

        $locationProvider
        	.html5Mode({
	        	enabled: true,
	  			requireBase: false
  			});
    }]);