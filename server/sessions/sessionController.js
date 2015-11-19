'use strict';

var User = require('../users/userModel.js');

exports.login = function(req, res, next) {
  var user = req.body;

  User.findOne({
    email: user.email
  }, function(err, found) {
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    console.log('FOUND:', found);
    res.json(found);
  })
};