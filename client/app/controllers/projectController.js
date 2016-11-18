angular.module('resumeApp').controller('projectController', 
['$scope', 'projectService', function($scope, projectService){
	$scope.projects = projectService.getFullProjects();
	$scope.toggleProject = function(project){
		if (!project.open){
			projectService.removeOpen(project.name);
		}else{
			projectService.addOpen(project.name);
		}
	}
}]);