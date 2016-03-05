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



(function($, d, w){

	var Cart = {};
	function removeItemFromCart($li){
		var order      = $li.attr("order");
		var $prevAll   = {};
		var length     = 0;
		var nextLast   = {};
		var $nextLast  = {};

		$li.attr("removed", true);
		$li.slideUp(300);

		if(order === "last"){
			prevAll   = $li.prevAll().not("[removed=true]");
			nextLast  = $prevAll[0];
			$nextLast = $(nextLast);

			$li.attr("order", "");



		}
	}

	function setLastListItem(){
		$("li:last-child").attr("order", "last");
	}

	Cart.removeItemFromCart = removeItemFromCart;
	w.Cart 					= Cart;

}(jQuery, document, window));
(function($, d){
	Review.renderReviewStarsAll($('.stars'));
	Review.renderReviewStars($('.score'));
    Main.setPriceCurrencySymbol($("[id=price]"));

	var form 		   = d.querySelector("form");
	var url 		   = form.action;
	var button 		   = d.querySelector(".add-to-cart");
	var submit 	       = d.querySelector("button[type=submit]");
	var qty            = $(".quantity");
	var incr    	   = $(".increase");
	var decr    	   = $(".decrease");
	var model 		   = false;
	var reveal         = $(".open-small-screen-description, .close-description");
	var description    = $(".small-screen-description");
	var review 		   = "";
	var $stars 		   = {};
	var score 	       = 0.0;
	var successMethods = {};
	var errorMethods   = {};
	var increase 	   = Main.increase(100);
	var decrease       = Main.decrease(1);
	var error 	       = function(){

	};
	var success        = function(){
		submit.classList.remove('loading-button');
		this.reset();
		$(review).insertBefore('.li-review-form').slideDown('fast');
		$stars 	= $('.li-review-form').prev().find('.stars');
		score 	= $stars.attr('score');
		Review.renderReviewStarsAll($stars);
		Review.renderReviewStars($('.score'));
	};

	incr.click(function(){
		var number = qty.text();
		qty.text(increase(number));
		qty.attr("data-value", increase(number));
	});

	decr.click(function(){
		var number = qty.text();
		qty.text(decrease(number));
		qty.attr("data-value", decrease(number));
	});
    
	button.addEventListener("click", function(){
		var model = Main.createModel("cart");
		model.option = "add";
    	Main.save(
    		"/cart-methods", 
    		model,
    		function(){

    		},
    		function(){
    			$(".added-successfully").fadeIn(700);	
    		} 
    	);
	});

	form.addEventListener("submit", function(event){
		event.preventDefault();
		model = Main.createModel("review", {"isNumber": "score", "isNotEmpty": "title", "isNotEmpty": "review", "isNotEmpty": "username"});
		if(model){
			submit.classList.add("loading-button");
			model.date 	= Review.getDateStringFormat(new Date());
			success 	= success.bind(this);
			review 		= Review.createReviewHTML(model);
			Main.save(url, model, error, success);
		}
		else{
			return false;
		}
	});

	reveal.click(function(e){
		description.toggleClass("open-description");
	});

}(jQuery, document));

