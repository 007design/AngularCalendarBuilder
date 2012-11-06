function MainCtrl($scope, $compile, ImagesDataSvc, AdorSvc){  
	$scope.imagesDataSvc = ImagesDataSvc;
	$scope.adors = AdorSvc;
	
	$scope.months = [
			{ador:'jan_image', text:'January'},
			{ador:'feb_image', text:'February'},
			{ador:'mar_image', text:'March'},
			{ador:'apr_image', text:'April'},
			{ador:'may_image', text:'May'},
			{ador:'jun_image', text:'June'},
			{ador:'jul_image', text:'July'},
			{ador:'aug_image', text:'August'},
			{ador:'sep_image', text:'September'},
			{ador:'oct_image', text:'October'},
			{ador:'nov_image', text:'November'},
			{ador:'dec_image', text:'December'}
	];
	
	$scope.selectedMonth = $scope.months[0];		
	$scope.selectedFilter = 'spring';
	
	$scope.images = $scope.imagesDataSvc.query({},function(){
		/** Bind the ADOR inputs to the service **/
		$(document).find('input.FormField').each(function(){
			/** Find the associated FieldLabel and get the text **/
			var label = $.trim($(this).closest('tr').find('.FormLabel').text());
			
			/** Save any current value before binding **/
			var tmp = $(this).val();
			
			/** Bind input element using ng-model **/
			$(this).attr('ng-model','adors.'+label);
			var x = $compile($(this));
			x($scope);		
			
			/** Reassign saved value **/
			$scope.adors[ label ] = tmp;
		});
		
		angular.forEach($scope.months, function(m){
			var id = $scope.adors[ m.ador ];
			angular.forEach($scope.images, function(i){
				if (i.id == id)
					m.img = i;
			});
		});
	});
	
	$scope.selectImage = function(image, $event){
		$event.preventDefault();
		$event.stopPropagation();
		
		$scope.selectedMonth.img = image.id;
		
		$scope.adors[ $scope.selectedMonth.ador ] = image.id;
	};
	
	$scope.selectMonth = function(month){
		$scope.selectedMonth = month;
	};
	
	$scope.isSubmitDisabled = function(){
		for (var m in $scope.months) {
			if (!$scope.months[m].img)
				return true;
		}
		return false;
	};
	
	$scope.submitOrder = function(){
		// GO TO THE NEXT PAGE
	};
}