const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const userModel = mongoose.model('user', userSchema);
module.exports = mongoose.model('user', userSchema);
