var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var gameSchema = new Schema({
  	name: String,
  	slug: String,
  	price: Number,
 		description: String, 
 		image_path: String,
  	genre: String,
  	reviews: [{posted_on: String, timestamp: Date, title: String, rating: Number, username: String, text: String}],
  	rating: Number,
    review_count: Number, 
    avg_rating: Number,
    home_image: String

});
gameSchema.statics.findGamesByGenre = function findGamesByGenre(genre, cb){

	return this.find({ genre: genre }, cb);

}

gameSchema.statics.findGameBySlug = function findGameBySlug(slug, cb){

	return this.findOne({ slug: slug }, cb);
}

gameSchema.statics.updateGameReview = function updateGameReview(rating, slug, cb){

	this.update({slug: slug}, {$inc: {reviews: 1, rating: rating}}, cb);
}

gameSchema.statics.getThreeGames = function getThreeGames(cb){

	return this.find({ }, {$limit: 3})
}

var Game = mongoose.model('Game', gameSchema);
module.exports = Game;