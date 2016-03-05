(function($, d, w){

	var Review = {};

	function interpolateString(text, obj){
		var pattern = /\{([a-zA-z]+)\}/g;
		text = text.replace(pattern, function(match, p1){
			return obj[p1];
		});
		return text;
	}

	function getDateStringFormat(date){
		var monthNames = [
			"January", 
			"February", 
			"March", 
			"April", 
			"May", 
			"June",
  			"July", 
  			"August", 
  			"September", 
  			"October", 
  			"November", 
  			"December"
		];
		return  monthNames[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear(); 
	}

    function renderReviewStarsAll(elements){
    		var score = 0.0;
    		$.each(elements, function(){
    			score = $(this).attr("score")
    			$(this).raty({ 
    				score: score, 
    				path: "/images/", 
    				half: true, 
    				readOnly: true
    			});
    		});
    }

    function renderReviewStars(element){
    	element.raty({
    		path: 	"/images/", 
    	 	half: 	true, 
    	 	round:  { down: .25, full: .6, up: .76 },
    	 	click:  function(score){
						$(this).attr("data-value", score);
    	 	}
    	});
    }

    function createReviewHTML(model){
    	var html = "<li style='display:none'>\
		                <div class='stars' score='{score}'></div>\
		                <span>{title}</span>\
		                <p>By {username} on {date}</p>\
		                <p>{review}</p>\
		            </li>";
    	return interpolateString(html, model);
    }
    
	Review.renderReviewStarsAll   = renderReviewStarsAll;
	Review.renderReviewStars      = renderReviewStars;
	Review.createReviewHTML 	  = createReviewHTML;
	Review.getDateStringFormat	  = getDateStringFormat;
	w.Review 				      = Review;

}(jQuery, document, window));


