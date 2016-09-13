angular.module('resumeApp').controller('projectController', function($scope, projectService){
	$scope.projects = projectService.getFullProjects();

	$scope.toggleProject = function(project){
		console.log('toggle')
		if (!project.open){
			projectService.removeOpen(project.name);
		}else{
			projectService.addOpen(project.name);
		}
	}
});