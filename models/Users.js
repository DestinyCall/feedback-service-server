const mongoose = require('mongoose');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  credits: {
    type: Number,
    default: 0,
  },
  registeredOn: {
    type: Number,
    default: null,
  },
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.omit(userObject, ['__v']);
};

let User = mongoose.model('users', UserSchema);

module.exports = User;
