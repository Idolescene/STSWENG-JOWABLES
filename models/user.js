const mongoose = require('mongoose');

const databaseURL = /*db url here*/;

const options = { useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

mongoose.connect(databaseURL, options);

const userSchema = new mongoose.Schema(
    {
        fullname:       {type: String, required: true},
        username:       {type: String, required: true},
        email:       {type: String, required: true},
        password:       {type: String, required: true}
    }
);

module.exports =/*user=*/ mongoose.model('user', userSchema);
