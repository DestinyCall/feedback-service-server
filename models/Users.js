const mongoose = require('mongoose');
const _ = require("lodash");

// Define our user schema
const UserSchema= new mongoose.Schema({
    googleId: {
        type: String
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    credits: {
        type: Number,
        default: 0
    },   
    registeredOn: {
        type: Number,
        default: null,
    },  
})

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();
  return _.omit(userObject, ["__v"]);
};

// Create users model
let User = mongoose.model("users",UserSchema);

// Export the Mongoose model
module.exports = User