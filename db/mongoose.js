const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  poolSize: 10,
  serverSelectionTimeoutMS: 10000,
  socketTimeoutMS: 70000,
  family: 4,
});

const connection = mongoose.connection;

connection.once('open', () => {
  console.log('MongoDB connection estblished succesfully');
});

module.exports = { mongoose };
