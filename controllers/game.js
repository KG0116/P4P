var Game = require('../models/games');

var gameController = {};

gameController.getTopThreeGames = function(req, res){
	 /*Game.find({ }).limit(3).exec(function(err, games){
        if(err) throw err;
        console.log(games);
        res.render('home', {games: games});
    });*/
	Game.find({
	 			'_id': {$in: ['55c1df2d58f2e44395769f7c', '55c1e42e58f2e44395769f82','55c1e6f958f2e44395769f84']}
	 		},
	 		function(err, games){
	 			if(err) throw err;
	 			res.render('home', {games: games});
			}
	);
};

gameController.getGamesByGenre = function(req, res){
	var genre = req.params.genre;
	Game.findGamesByGenre(genre, function(err, games){
		if(err) throw err;
		res.render('games', {games: games});
	});
};

gameController.getGameBySlug = function(req, res){	
	var slug = req.params.slug;
	Game.findGameBySlug(slug, function(err, game){
		if(err) throw err;
		var average_rating = game.rating / game.review_count;
		res.render('game', {game: game, avg: average_rating});
	});
};

gameController.saveReview = function(req, res){
	var slug 		= req.body.slug;
	var average		= 0.0;
	var timestamp 	= Date.now();
	var review 		= {
		posted_on: 	req.body.date,
        timestamp: 	timestamp,
        title: 		req.body.title,
        rating: 	req.body.score,
        username: 	req.body.username, 
        text: 		req.body.review,
	};
	Game.findOneAndUpdate(
		{slug: slug},
		{$inc: {rating: req.body.score, review_count: 1},$push: {reviews: review}},
		{ upsert : true },
		function(err){
			if(err) throw err
			res.json({"status": "OK"});
		}
	);
};

module.exports = gameController;