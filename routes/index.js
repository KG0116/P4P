var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var customerController = require('../controllers/customer');
var cartController = require('../controllers/cart');
var reviewController = require('../controllers/review');
var gameController = require('../controllers/game');
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/ps4play');


function redirectIfAuthenticated(req, res, next){
    if(req.session.authenticated){
        res.redirect('/');
    }
    else{
        return next();
    }
}

function redirectIfNotAuthenticated(req, res, next){
    if(!req.session.authenticated){
        res.redirect('/login');
    }
    else{
        return next();
    }
}

function redirectIfCartIsEmpty(req, res, next){
    if(req.session.cart === undefined){
        res.redirect('/');
    }
    else{
        return next();
    }
}

/* GET home page. */
router.get('/', function(req, res) {
    gameController.getTopThreeGames(req, res);
});

router.get('/games/:genre/', function(req, res){
    gameController.getGamesByGenre(req, res);
});

router.get('/games/:genre/:slug', function(req, res){
    gameController.getGameBySlug(req, res);
});

router.get('/cart', function(req, res){
    if(req.session.cart){
        var cart = cartController.getCartObject(req);
        res.render('cart', {items: cart.items, total: cart.total});
    }
    else{
        res.render('cart', {items: undefined});
    }
});

router.post('/cart-methods', function(req, res){
    switch(req.body.option){
        case 'add':
            cartController.addItemToCart(req, res);
            break;
        case 'remove':
            cartController.removeItem(req, res);
            break;
        case 'complete':
            cartController.completeOrder(req, res);
            break;
    } 
});

router.get('/checkout', redirectIfCartIsEmpty, redirectIfNotAuthenticated, function(req, res){
    var cart = cartController.getCartObject(req);
    res.render('checkout', {total: cart.total});
});

router.get('/register', redirectIfAuthenticated, function(req, res){
    var styleErrorField = {};
    var errorMessages   = {}
    var errors          = req.flash('account_error');
    
    styleErrorField.username = "off";
    styleErrorField.email    = "off";
    styleErrorField.password = "off";

    errorMessages.username   = "username* (6-20 chars)";
    errorMessages.email      = "email*";
    errorMessages.password   = "password*";

    errors.forEach(function(element, index){
        var fieldName    = element.split("/")[0];
        var errorMessage = element.split("/")[1];

        styleErrorField[fieldName] = "on";
        errorMessages[fieldName]   = errorMessage;
    });
	res.render('register', { messages: errorMessages, alert: styleErrorField});
});

router.post('/register', function(req, res){
    customerController.register(req, res);
});

router.get('/login', redirectIfAuthenticated, function(req, res){
    var styleErrorField = {};
    var errorMessages   = {};
    var errors          = req.flash('login_error');

    styleErrorField.username = "off";
    styleErrorField.password = "off";

    errorMessages.username = "username*";
    errorMessages.password = "password*";

    errors.forEach(function(element, index){
        var fieldName    = element.split("/")[0];
        var errorMessage = element.split("/")[1];

        styleErrorField[fieldName] = "on";
        errorMessages[fieldName]   = errorMessage;
    });
	res.render('login', { messages: errorMessages, alert: styleErrorField});
});

router.post('/login', function(req, res){
    customerController.login(req, res);    
});

router.get('/logout', redirectIfNotAuthenticated, function(req, res){
    req.session.authenticated = false;
    res.redirect('/');
});

router.post('/review', function(req, res){
    gameController.saveReview(req, res);
});

module.exports = router;
