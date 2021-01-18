const mongoose = require('./connection');

const aboutSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
});

const aboutModel = mongoose.model('about', aboutSchema);

// Retrieve all abouts
exports.getAll = (query, next) => {
  aboutModel.find({}).exec((err, texts) => {
    if (err) throw err;
    const aboutObjects = [];
    texts.forEach((doc) => {
      aboutObjects.push(doc.toObject());
    });
    next(err, aboutObjects);
  });
};
