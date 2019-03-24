const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();

const config = require('./config');
const jwtAuth = require('./auth');

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
  db.run("CREATE TABLE users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, password TEXT)");
});

const router = express.Router();

router.post('/register', function(req, res) {
  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  db.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", req.body.name, req.body.email, hashedPassword,
  function (err) {
    if (err) return res.status(500).send("An error occurred during registration");

    res.status(200).send({ status: 'ok' });
  });
});

router.post('/login', function(req, res) {
  console.log('LOGIN');
  db.get("SELECT id, name, email, password FROM users WHERE email=?", req.body.email, function (err, user) {
    if (err) return res.status(500).send({status: 'Server error', err:err});
    if (!user) return res.status(404).send('User not found');

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

    console.log('Generating token', user.id);
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token });
  });
});

router.get('/me', jwtAuth, function(req, res, next) {
  console.log('ME', req.userId);
  db.get("SELECT id, name, email FROM users WHERE id=?", req.userId, function (err, user) {
    if (err) return res.status(500).send("There was a problem finding the user.");
    if (!user) return res.status(404).send("No user found.");
    res.status(200).send(user);
  });
});

module.exports = router;
