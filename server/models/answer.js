var mongoose = require('mongoose');
var Schema = mongoose.Schema;

let AnswerSchema = new mongoose.Schema({
    answer: {
        type:String,
        required: [true, 'Answer is required'],
        minlength: [5, 'Answer must be at least 5 characters']
    },

    details:String,

    likes:Number,

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    question: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],
},
{timestamps: true});

mongoose.model('Answer', AnswerSchema);
