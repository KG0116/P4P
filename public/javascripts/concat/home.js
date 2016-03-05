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



(function($, w, d){

	var Carousel  		= {};
	var carousel 		= $(".carousel");
	var controls 		= $(".controls");
	var carouselImages  = carousel.find(".carousel-item");
	var ticks  	  		= 0;
	var numberOfImages 	= carouselImages.length;
	var nextImage       = {};
	var currentImage    = {};

	function image(value){
		return "[order=" + value + "]";
	}

	function control(value){
		return "[index=" + value + "]";
	}

	$.each(carouselImages, function(index){
		var self = $(this);
		self.attr("order", index);
	});

	Carousel.revealNextImage = function(){
		currentImage   = carousel.find(image(ticks % numberOfImages));
		currentControl = controls.find(control(ticks % numberOfImages));
		ticks     	   = ticks + 1;
		order     	   = ticks % numberOfImages;
		nextImage 	   = carousel.find(image(order));
		nextControl    = controls.find(control(order));

		currentImage.css("visibility", "hidden").css("opacity", 0);
		currentControl.css("background", "transparent");

		nextControl.css("background", "white");
		nextImage.css("visibility", "visible").css("opacity", 1);
	};

	Carousel.revealSelectedImage = function(index){
		currentImage   = carousel.find(image(ticks % numberOfImages));
		currentControl = controls.find(control(ticks % numberOfImages));
		ticks 		   = index;
		nextImage 	   = carousel.find(image(ticks));
		nextControl    = controls.find(control(ticks));

		currentImage.css("visibility", "hidden").css("opacity", 0);
		currentControl.css("background", "transparent");

		nextControl.css("background", "white");
		nextImage.css("visibility", "visible").css("opacity", 1);
	}

	w.Carousel = Carousel;

}(jQuery, window, document));
(function($, d){
	Review.renderReviewStarsAll($(".stars"));
	Main.setPriceCurrencySymbol($("[id=price]"));

	var pauseCarousel = setInterval(function(){Carousel.revealNextImage();}, 5000);
	var dot 		  = $(".dots div");
	var li            = $(".gm-list-item");
    var carousel      = $(".carousel");

	dot.click(function(){
		clearInterval(pauseCarousel);
		var self = $(this);
		Carousel.revealSelectedImage(self.attr("index"));
		pauseCarousel = setInterval(function(){Carousel.revealNextImage();}, 5000);
	});
}(jQuery, document));