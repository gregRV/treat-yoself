'use strict';

var User = require('./userModel.js');

exports.create = function(req, res) {
  var user = new User();
  user.username = req.body.name;
  user.email = req.body.email;
  user.password = req.body.password;

  console.log('USER AFTER BUILDING', user);

  user.save(function(err){
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    res.json(user);
  })
};
