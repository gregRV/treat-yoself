var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');
// Q        = require('q'),
// SALT_WORK_FACTOR  = 10;


var UserSchema = new mongoose.Schema({
  username: {
    type: String
    // required: true,
    // unique: true
  },

  email: {
    type: String
    // required: true,
    // unique: true
  },

  password: {
    type: String
    // required: true
  },

  tixCount: {
    type: Number,
    default: 0
  }
});

// THIS FUNCTION, EVEN WHEN COMMENTED OUT, HELD UP THE USER POST!
// PROBABLY BECAUSE IT WAS WAITING FOR next() T_____T
// ALSO, IF YOU TRY TO ASSIGN A PROPERTY THAT DOESN'T EXIST ON THE MODEL,
// NO ERROR WILL SHOW. JUST MAKE SURE TO CHECK ie name VS username

// UserSchema.pre('save', function (next) {
  // var user = this;

  // // only hash the password if it has been modified (or is new)
  // if (!user.isModified('password')) {
  //   return next();
  // }

  // // generate a salt
  // bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
  //   if (err) {
  //     return next(err);
  //   }

  //   // hash the password along with our new salt
  //   bcrypt.hash(user.password, salt, null, function(err, hash) {
  //     if (err) {
  //       return next(err);
  //     }

  //     // override the cleartext password with the hashed one
  //     user.password = hash;
  //     user.salt = salt;
  //     next();
  //   });
  // });
// });

module.exports = mongoose.model('users', UserSchema);