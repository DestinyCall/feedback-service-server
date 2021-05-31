const mongoose = require('mongoose');
const _ = require('lodash');
const { Schema } = mongoose;

const recipientSchema = new Schema({
  email: {
    type: String,
    reruired: true,
  },
  responded: {
    type: Boolean,
    default: false,
  },
});

recipientSchema.methods.toJSON = function () {
  var recipient = this;
  var recipientObject = recipient.toObject();
  return _.omit(recipientObject, ['__v']);
};
module.exports = recipientSchema;
