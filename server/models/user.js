var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },

    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question'
    }],

    answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer'
    }],

}, {timestamps: true });

var User = mongoose.model('User', UserSchema);
