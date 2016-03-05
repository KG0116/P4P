var Review = require('../models/reviews');
var Game   = require('../models/games');
var reviewController = {};

reviewController.submitReview = function(req, res){
	var timestamp = Date.now();
    var newReview = Review({
        posted_on: req.body.date,
        timestamp: timestamp,
        game_slug: req.body.slug,
        title: req.body.title,
        rating: req.body.score,
        username: req.body.username, 
        text: req.body.review,
    });
    newReview.save(function(err){
        if(err) throw err;
    });
    Game.updateGameReview(req.body.score, req.body.slug , function(err){
        if(err) throw err;
        console.log('OK');
    });
    res.json({status: 'OK'});
}

module.exports = reviewController;