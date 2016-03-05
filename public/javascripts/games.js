(function($, d){
	var stars = $(".stars");
    Main.setPriceCurrencySymbol($("[id=price]"));
	stars.each(function(){
		var self = $(this);
        var rating = parseFloat(self.attr("rating"));
        var reviews = parseInt(self.attr("review-count"));
        if(reviews === 0){
        	self.raty(
        		{ 
        			score: undefined, 
        			path: '/images/', 
        			half: true, 
        			readOnly: true
        		}
        	);
        }
        else{
        	var average = rating / reviews;
            self.raty(
        		{ 
        			score: average, 
        			path: '/images/', 
        			half: true, 
        			readOnly: true
        		}
        	);
        }
	});


}(jQuery, document));