var mongoose = require('mongoose');
var passwordHash = require('password-hash');



var Schema = mongoose.Schema;
var customerSchema = new Schema({
  		username: String,
  		email: String,
 		password: String
});


customerSchema.statics.getCustomerByUserName = function getCustomerByUserName(username, cb){

	return this.findOne({ username: username }, cb);
}

customerSchema.statics.usernameAlreadyExists = function usernameAlreadyExists(username, cb){

	return this.count({ username: username }, cb);
}

var Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;