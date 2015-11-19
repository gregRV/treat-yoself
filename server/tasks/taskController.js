'use strict';

var Task = require('./taskModel.js');

exports.get = function(req, res) {
  Task.find({},
    function(err, found) {
      if (err) {
        console.log('ERROR:', err);
        res.send(err);
      }
      console.log('FOUND:', found);
      res.json(found);
    })
};
