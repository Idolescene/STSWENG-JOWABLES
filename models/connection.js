// connection.js initializes the MongoDB connection through Mongoose

const mongoose = require('mongoose');
const dbURL = "mongodb+srv://admin:1234@cluster.0xawc.mongodb.net/salawal_db?retryWrites=true&w=majority";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

mongoose.connect(dbURL, options);

module.exports = mongoose;