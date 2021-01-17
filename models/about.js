const mongoose = require('./connection');

const aboutSchema = new mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String, required: true}
});

const aboutModel = mongoose.model('about', aboutSchema);
