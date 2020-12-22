const mongoose = require('./connection');

const userSchema = new mongoose.Schema(
    {
        fullname:       {type: String, required: true},
        username:       {type: String, required: true},
        email:       {type: String, required: true},
        password:       {type: String, required: true}
    }
);

module.exports =/*user=*/ mongoose.model('user', userSchema);
