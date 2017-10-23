var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: 'MY_SECRET',
  userProperty: 'payload'
});

var ctrlAuth = require('../controllers/getTweets');

// get continous updates
router.post('/getUpdates', ctrlAuth.getUpdates);

// get trending topics
router.post('/loadTopics', ctrlAuth.loadTopics);

module.exports = router;
