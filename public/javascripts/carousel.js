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