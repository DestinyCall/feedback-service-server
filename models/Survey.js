const mongoose = require('mongoose');
const _ = require('lodash');
const { Schema } = mongoose;
const RecipientSchema = require('./Recipient');

const surveySchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  recipients: [RecipientSchema],
  yes: {
    type: Number,
    default: 0,
  },
  no: {
    type: Number,
    default: 0,
  },
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  dateSent: Date,
  lastResponded: Date,
});

surveySchema.methods.toJSON = function () {
  var survey = this;
  var surveyObject = survey.toObject();
  return _.omit(surveyObject, ['__v']);
};

let Survey = mongoose.model('surveys', surveySchema);

module.exports = Survey;
