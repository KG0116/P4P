(function($, d){ 
	var remove  = $(".delete");
    Main.setPriceCurrencySymbol($("[id=price]"));
	remove.on("click", function(event){
		event.preventDefault();

		var self 	 = $(this);
		var li 	     = self.parents("li");
		var total    = $(".order-total");
		var cart     = $(".cart");
		var checkout = $(".checkout");
		var price 	 = li.find("#price");
		var slug 	 = li.find("#slug");
		var quantity = li.find("#quantity");
		var item 	 = {};
		var empty 	 = "<p class='empty-cart'>Your shopping cart is empty.</p>";

		//add model-name to the values in the selected li
		price.attr("model-name", "item");
		slug.attr("model-name", "item");
		quantity.attr("model-name", "item");

	    item 	    = Main.createModel("item");
        item.option = "remove";

		price.attr("model-name", "");
		slug.attr("model-name", "");
		quantity.attr("model-name", "");

		Main.save(
			"/cart-methods",
			item, 
			function(){

			},
			function(data){
				if(data.total){
					total.text(data.total);
					Main.setPriceCurrencySymbol(total);
					li.slideUp(500);
				}
				else{
					cart.append(empty);
					li.slideUp(500);
					total.slideUp("fast");
					$("#remove-me").remove();
					checkout.remove();
				}
			}
		);	
	});

}(jQuery, document));