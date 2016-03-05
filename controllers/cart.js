//cart: {items:{game_slug:{price:price, image:image, game:game, quantity:quantity, genre:genre }}, total:total}

var cartController = {};

cartController.addItemToCart =  function(req, res){
	var cart = req.session.cart;
	var newCart = {};
	var requestBody = req.body;
	var item = {};
	var cartItemsKeys = [];
	var price = parseFloat(requestBody.price);
	var quantity = parseInt(requestBody.quantity);
	var previousQuantity = 0;
	if(cart){
		cart = JSON.parse(cart);
		cartItemsKeys = Object.keys(cart.items);
        
		if(cartItemsKeys.indexOf(requestBody.slug) > -1){
			//item already exists 
			cart.items[requestBody.slug].quantity += quantity;
			cart.total +=  price * quantity;
			req.session.cart = JSON.stringify(cart);
		}
		else{
			//add new item to cart
			item.price = price;
			item.image = requestBody.image;
			item.game = requestBody.game;
			item.genre = requestBody.genre;
			item.quantity = quantity;
			cart.items[requestBody.slug] = item;
			cart.total += price * quantity;
			req.session.cart = JSON.stringify(cart);
		}
	}
	else{
		//create cart
		item.price = price;
		item.image = requestBody.image;
		item.genre = requestBody.genre;
		item.game = requestBody.game;
		item.quantity = quantity;
		newCart.items = {};
		newCart.items[requestBody.slug] = item;
		newCart.total = price * quantity;
		req.session.cart = JSON.stringify(newCart);
	}
	res.json({status: 'OK'});
};

cartController.completeOrder = function(req, res){
	req.session.cart = undefined;
	res.json({status: 'OK'});
};

cartController.removeItem = function(req, res){
	var slug 	 = req.body.slug;
	var price 	 = parseFloat(req.body.price);
	var quantity = parseInt(req.body.quantity);
	var cart 	 = req.session.cart;
	var total 	 = 0.0;

	cart 	   	 = JSON.parse(cart);
	total 		 = parseFloat(cart.total);
	total        = total -  price * quantity;
	total        = total.toFixed(2);
    cart.total   = total;
    
	delete cart.items[slug];

	if(Object.keys(cart.items).length === 0){
		req.session.cart = undefined;
		res.json({total: undefined});
	}
	else{
		req.session.cart = JSON.stringify(cart);
		res.json({total: total});
	}
};

cartController.getCartObject = function(req){
	return JSON.parse(req.session.cart);
};

module.exports = cartController;