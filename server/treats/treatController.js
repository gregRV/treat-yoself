'use strict';

var Treat = require('./treatModel.js');

exports.get = function(req, res) {
  Treat.find({},
    function(err, found) {
      if (err) {
        console.log('ERROR:', err);
        res.send(err);
      }
      res.json(found);
    });
};

exports.create = function(req, res) {
  console.log('CREATING TREAT:', req.body);

  var treat = new Treat();
  treat.name = req.body.name;
  treat.price = req.body.price;
  treat.redeemed = false;
  treat.save();
  res.json(treat);
};

exports.edit = function(req, res) {
  console.log('TREAT TO EDIT:', req.body)

  Treat.findOne({name: req.body.name}, function(err, treat){
    console.log('FOUND TASK:', treat);
    treat.redeemed = req.body.status;
    treat.save();
    res.json(treat);
  });
};
