let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//pattern for Users
userSchema = new Schema({
	id: Number,
	name: String,
	screen_name: String,
	}),
User = mongoose.model('user', userSchema);

module.exports = User;