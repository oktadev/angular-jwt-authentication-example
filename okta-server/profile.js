var express = require('express');
var oktaAuth = require('./auth');

var router = express.Router();

router.get('/profile', oktaAuth, function(req, res, next) {
  console.log('ME', req.userId);
  res.status(200).send({id: req.userId, email: req.userEmail});
});

module.exports = router;

