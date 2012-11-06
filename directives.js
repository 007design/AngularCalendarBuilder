angular.module('directives',[])
.directive('previewThumb', function(){
  return {
		restrict:'C',
		link: function($scope, element, attr){
			var $container = $('<div/>').attr('id', 'imgPreviewContainer')
            .append('<img/>').hide()
            .css('position','absolute')
            .appendTo('body');
			
			var $img = $('img', $container);
			
			element.mousemove(function(e){				                
                $container.css({
                    top: e.pageY + 10 + 'px',
                    left: e.pageX + 10 + 'px'
                });				                
            })
            .hover(function(){				                
                var link = this;
    			var preview = element.closest('span').attr('alt');
                $container.show();
                $img.load(function(){
                    $img.show();
                }).attr( 'src' , preview );				                 	
            }, function(){				                
                $container.hide();
                $img.unbind('load').attr('src','').hide();				                
            });
		}
	};
})
.filter('imgfilter', ['CatSvc', function(CatSvc){
	var catSvc = CatSvc;
	return function(input,arg){
		var filtered = [];
		
		if (arg == 'spring' || arg == 'summer' || arg == 'fall' || arg == 'winter') {
			for (var b in input) {
				if (input[b].season.toLowerCase() == arg)
					filtered.push(input[b]);
//				else
//					console.log(input[b]);
			}
		} else {
			for (var a in catSvc[arg]){
				for (var b in input) {
					if (input[b].id == catSvc[arg][a])
						filtered.push(input[b]);
				}
			}
		}
		
		return filtered;
	};
}]);