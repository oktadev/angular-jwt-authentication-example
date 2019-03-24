const jwt = require('jsonwebtoken');
var config = require('./config');

function jwtAuth(req, res, next) {
  if (!req.token) {
    return res.status(403).send({ auth: false, message: 'No token provided' });
  }

  jwt.verify(req.token, config.secret, function(err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Could not authenticate token' });
    }
    req.userId = decoded.id;
    next();
  });
}

module.exports = jwtAuth;
