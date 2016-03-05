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