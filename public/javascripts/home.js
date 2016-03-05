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