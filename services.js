angular.module('services',['ngResource'])
.factory('ImagesDataSvc', ['$resource', function($resource){
  return $resource('data.js' );
}])
.service('AdorSvc', [ function(){
	var $scope = this;
	
	return $scope;
}])
.service('CatSvc', function(){
	var $scope = this;
	
	$scope['Model Railroad'] = [16,36,54,55,77,108];
	$scope['Wonderland Express'] = [040,111,112,113,115,116,117,138,168,169];
	
	return $scope;
});