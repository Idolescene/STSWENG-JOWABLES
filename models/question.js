const mongoose = require('./connection');

const questionSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true}
});

const questionModel = mongoose.model('question', questionSchema);
