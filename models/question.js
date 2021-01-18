const mongoose = require('./connection');

const questionSchema = new mongoose.Schema({
  question: {type: String, required: true},
  answer: {type: String, required: true}
});

const questionModel = mongoose.model('questions', questionSchema);

// Retrieve all questions
exports.getQuestions = (query, next) => {
  questionModel.find({}).exec((err, result) => {
    if (err) throw err;
    const questionObjects = [];
    result.forEach((doc) => {
      questionObjects.push(doc.toObject());
    });
    next(err, questionObjects);
  });
};
