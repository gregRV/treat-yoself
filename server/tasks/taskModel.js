var mongoose = require('mongoose');

var TaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('tasks', TaskSchema);