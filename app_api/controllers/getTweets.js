'use strict';
var Twit = require('twit');
var config = require('../../config');
var request = require('request');

// OAuth module for authenticating the twitter APIs with consumer key and secret
var OAuth = require('oauth').OAuth;
var oauth = new OAuth(
	"https://api.twitter.com/oauth/request_token",
	"https://api.twitter.com/oauth/access_token",
	config.TWITTER_AUTH_KEYS.CONSUMER_KEY,
	config.TWITTER_AUTH_KEYS.CONSUMER_SECRET,
	"1.0",
	"http://localhost:3000/auth/twitter/callback",
	"HMAC-SHA1"
);	

// Twit module to enable streaming of live tweets based on topics
var T = new Twit({
	consumer_key: config.TWITTER_AUTH_KEYS.CONSUMER_KEY,         
	consumer_secret: config.TWITTER_AUTH_KEYS.CONSUMER_SECRET,
	access_token: config.TWITTER_AUTH_KEYS.ACCESS_TOKEN,
	access_token_secret: config.TWITTER_AUTH_KEYS.ACCESS_TOKEN_SECRET,
	timeout_ms: 60*1000,  // optional HTTP request timeout to apply to all requests.
})


/**
 * Description   :  Controller function that recieves the topic selected from 
 *                  frontend and activates stream and socket connectionfor real-time communication
 * Params        :  filterName => String
 * API           :  /getUpdates
 */
module.exports.getUpdates = function(req, res) {
	var http = require('../../bin/www');
	var io = require('socket.io')(http);
	var stream = T.stream('statuses/filter', { track: (req.body.filterName) })

	stream.on('tweet', function (tweets) {
		// emits the latest tweets
		io.sockets.emit("newTweet", {data:tweets});
	});

	io.sockets.on('connection', function(socket){
		// On page routed back to topics, stops twitter stream.
		socket.on('closeStream', function(data){
			stream.stop();
		});
	});
	
  	res.send(true);
	
};

/**
 * Description   :  Controller function that calls twitter /api/places.json and sends top 25 trending topics
 * API           :  /loadTopics
 */
module.exports.loadTopics = function(req, res, next) {
	oauth.get(
		'https://api.twitter.com/1.1/trends/place.json?id=' + config.WOEID,     
		config.TWITTER_AUTH_KEYS.ACCESS_TOKEN,
		config.TWITTER_AUTH_KEYS.ACCESS_TOKEN_SECRET,       
		function (e, data, response){
			if (e) next(e);        
			console.log(JSON.parse(data));
			res.send(JSON.parse(data)[0].trends.slice(0, 25))  
		}
	);  
};