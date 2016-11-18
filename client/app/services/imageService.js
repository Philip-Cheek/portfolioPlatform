angular.module('resumeApp').service('imageService', function(){
	var cache = {},
		cacheComplete = false,
		service = {},
		preList = [
			'mlogo.png',
			'swiftball.png',
			'javascript.png',
			'python.png',
			'ObjectiveC.png',
			'sqlng.png',
			'angular.png',
			'django.png',
			'flask.png',
			'node.png',
			'react.png',
			'socket.png',
			'html.png',
			'css.png',
			'git.png'
		],
		preUrl = 'https://s3.amazonaws.com/prosepair/',
		check;

	service.loadCache = function(info){
		var list, url;

		if (!info || !('list' in info)){
			list = preList;
		}

		if (!info || !('url' in info)){
			url = preUrl;
		}

		for (var i = 0; i < list.length; i++){
			cache[list[i]] = new Image();
			cache[list[i]].src = url + list[i];
		}
	}

	service.onCacheComplete = function(callback){
		if (!cacheComplete){
			check = setInterval(function(){
				var count = 0;
				for (var img in cache){
					if (!cache[img].complete || !(cache[img].naturalHeight !== 0)){
						break;
					}
					count++;
				}

				cacheComplete = count == Object.keys(cache).length;
				if (cacheComplete){
					clearInterval(check);
					callback();
				}
			}, 20);
		}else{
			callback();
		}
	};

	service.getImage = function(name){
		var image = cache[name];
		var status = image.complete && image.naturalHeight !== 0;

		if (status){
			return {'status': status, 'image': image};
		}

		return {'status': status};
	};

	return service;
});