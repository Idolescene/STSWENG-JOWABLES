const mongoose = require('./connection');

const userSchema = new mongoose.Schema({
  fullname: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true}
});

const userModel = mongoose.model('user', userSchema);
// module.exports = mongoose.model('user', userSchema);

// create a new user
exports.create = (object, next) => {
    const newUser = new userModel(object);
    newUser.save((err, user) => {
        next(err, user);
    });
};

// look for an existing user in the db
exports.getOne = (query, next) => {
    userModel.findOne(query, (err, user) => {
        next(err, user);
    });
};