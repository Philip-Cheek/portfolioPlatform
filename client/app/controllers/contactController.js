angular.module('resumeApp').controller('contactController', 
['$scope', '$http', function($scope, $http){

	$scope.send = {
		'email': ''
	};

	$scope.contact = {
		'Phone': {
			'cInfo':'(505) 917-9097',
			'logo': "fa fa-phone"
		},

		'Email': {
			'cInfo':'philip@cheekfamily.org',
			'logo': 'fa fa-envelope'
		}
	};

	$scope.info = true;
	$scope.field = true;

	$scope.fieldFocus = function(){
		if ($scope.send.email && $scope.send.email.length > 2){
			$scope.error = !validEmail();
		}
	};

	$scope.updateEmail = function(){
		if ($scope.error){
			$scope.error = !validEmail();
		}
	}

	$scope.submit = function(){
		$scope.error = !validEmail();

		if (!$scope.error){
			$http.post('/sendMail', $scope.send);
		}
	};

	function validEmail() {
		if (!$scope.send.email){
			return false;
		}

	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test($scope.send.email);
	}
}]);