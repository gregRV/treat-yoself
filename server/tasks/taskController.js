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

exports.create = function(req, res) {
  var sentTask = req.body;

  var task = new Task();
  task.name = sentTask.name;
  task.description = sentTask.description;
  task.reward = sentTask.reward;
  task.priority = sentTask.priority;
  task.complete = false;

  task.save(function(err){
    if (err) {
      console.log('ERROR:', err);
      res.send(err);
    }
    res.json(task);
  });
};
