let mongoose = require('mongoose');
let Schema = mongoose.Schema;

//pattern for Tweets
tweetSchema = new Schema({
	id: Number,
	created_at: String,
	text: String,
	}),
Tweet = mongoose.model('tweet', tweetSchema);

module.exports = Tweet;