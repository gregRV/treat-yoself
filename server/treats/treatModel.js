var mongoose = require('mongoose');

var TreatSchema = new mongoose.Schema({
  name: {
    type: String
  },

  price: {
    type: String
  },

  redeemed: {
    type: Boolean
  },
});

module.exports = mongoose.model('treats', TreatSchema);