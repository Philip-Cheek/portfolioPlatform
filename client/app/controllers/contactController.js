angular.module('resumeApp').controller('contactController', 
['$scope', '$http', function($scope, $http){

	$scope.send = {
		'email': ''
	};

	$scope.sent = false;
	$scope.response = false;

	$scope.contact = {
		'Phone': {
			'cInfo':'',
			'logo': "fa fa-phone"
		},

		'Email': {
			'cInfo':'',
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
		$scope.sent = !$scope.error;
		if ($scope.sent){
			$scope.afterSent = 'Your message has been successfully submitted'
			$scope.response = true;
		};
		// if (!$scope.error){
		// 	$http.post('/sendMail', $scope.send).success(function(response){
		//		$scope.response = true;
		// 		if (response.status){
		// 			$scope.afterSent = 'Your message has been successfully submitted';
		// 		}else{
		// 			$scope.afterSent = 'There has been an error. Something has gone wrong';
		// 		}
		// 	});
		// }
	};

	$scope.restore = function(){
		$scope.response = false;
		$scope.sent = false;

	}

	function validEmail() {
		if (!$scope.send.email){
			return false;
		}

	    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    return re.test($scope.send.email);
	}
}]);