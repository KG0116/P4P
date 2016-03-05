var mongoose = require('mongoose');


var Schema = mongoose.Schema;
var reviewSchema = new Schema({
  		posted_on: String,
  		timestamp: Date,
  		game_slug: String,
  		title: String,
  		rating: Number,
 		username: String, 
 		text: String,
});

reviewSchema.statics.getReviewsByGameSlug = function getReviewsByGameSlug(slug, cb){

	return this.find({ game: slug }, cb);

}

reviewSchema.statics.getTopThreeGames = function getTopThreeGames(cb){


	return this.aggregate([{$match: {}},{$group: {_id: "$game.name", average: {$avg: "$rating"}}},{$sort:{average: -1}},{$limit: 3}], cb);
}

var Review = mongoose.model('Review', reviewSchema);
module.exports = Review;