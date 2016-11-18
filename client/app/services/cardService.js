angular.module('resumeApp').service('cardService', ['$window', function($window){
	var service = {},
		gitOverlap = false;

	service.toggleCardServices = function(enable){
		var mainBody = document.getElementById("main");

		if (enable){
			document.addEventListener('mousemove', rotateCard);
			mainBody.addEventListener("click", gitRedirect);
		}else{
			document.removeEventListener('mousemove', rotateCard);
			mainBody.removeEventListener("click", gitRedirect);
		}
	};

	function gitRedirect(){
		if (gitOverlap){
			$window.location.href = 'https://github.com/Philip-Cheek';
		}
	}

	function rotateCard(e){
		var card = document.getElementById("card");
		monitorMouseOverlap(e);

		var rotateDegreeChange = findRotationDegrees(e);
		var fullTransform = ['transform', 'webkitTranform', 'mozTransform'];

		for (var i = 0; i < fullTransform.length; i++){
			card.style[fullTransform[i]] = rotateDegreeChange;
		}
	};

	function monitorMouseOverlap(event){
 		var shade, mouse;
 		gitOverlap = eventGitOverlap(event);

 		if (gitOverlap){
 			shade = '#81b3d2';
 			mouse = 'pointer'
 		}else{
 			shade = 'black'
 			mouse = 'auto'
 		}

 		document.getElementById('git').style.color = shade;
 		document.body.style.cursor = mouse;

 	}


	function eventGitOverlap(event){
		var gitCoord = document.getElementById('git').getBoundingClientRect();
		var x = event.pageX;
		var y = event.pageY;

		var withinWidth = x > gitCoord.left && x < gitCoord.right;
		var withinHeight = y < gitCoord.bottom && y > gitCoord.top;

		return withinWidth && withinHeight;
 	}

	function findRotationDegrees(event){
		var containerWidth = (document.getElementById('main').offsetWidth) * 1.9,
			containerHeight =  document.getElementById('main').offsetHeight;

		var ax = (containerWidth/2- event.pageX)/-20,
			ay = (containerHeight/2- event.pageY)/10;

		return "rotateY(" + ax + "deg) rotateX(" + ay + "deg)"

	}

	return service;
}]);