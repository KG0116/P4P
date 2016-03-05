(function($, d){
	var $button 			= $(".complete-order");
	var $header 			= $(".header");
	var $message 			= $(".message");
	var confirmationMessage = "Your order has been placed. <a href='/'>Continue shopping</a>";
	var errorMessage 		= "<span id='error'>Error! Please re-submit your order.</span>";

	Main.setPriceCurrencySymbol($("[id=price]"));
   
	$button.on("click", function(event){
		event.preventDefault();
		$(this).addClass("loading");
	
		Main.save(
			"/cart-methods",
			{"option": "complete"},
			function(data){
				$message.html(errorMessage);
			}, 
			function(data){
				$button.removeClass("loading");
				$header.text("Thank you!");
				$message.html(confirmationMessage);
				$button.remove();
			}
		);
	});

}(jQuery, document));