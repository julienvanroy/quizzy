var mongoose = require('mongoose');

var quizzesSchema = mongoose.Schema({
    name: String,
    logoName: String,
    createdBy: String,
    keywords: [String],
    questionsAndAnswers: [{
        question: String,
        point: Number,
        answers: [{
            valid: Boolean,
            answerText: String
        }]
    }]
});

module.exports = mongoose.model('quizzes', quizzesSchema);
