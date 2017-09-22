var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let QuestionSchema = new mongoose.Schema({
    question: {
        type:String,
        required: [true, 'Question is required'],
        minlength: [10, 'Question must be at least 10 characters']
    },

    description:String,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],
},
{timestamps: true});

mongoose.model('Question', QuestionSchema);
