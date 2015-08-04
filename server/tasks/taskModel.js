var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  description: {
    type: String,
  },

  reward: {
    type: String,
  },

  priority: {
    type: String,
  }
});

module.exports = mongoose.model('tasks', TaskSchema);