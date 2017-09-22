var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var Answer = mongoose.model('Answer');
var User = mongoose.model('User');


class AnswersController {
    index(req, res) {
    	Answer.find({}, (err, answers) => {
    		if(err){
    			return res.json(err);
    		}
    		return res.json(answers);
    	})
    }
    create(req, res) {

        req.body.user = req.session.user;
        req.body.question = req.params.id;

    	Answer.create(req.body, (err, answer) => {
    		if(err){
    			return res.json(err);
    		} else {
                Question.findByIdAndUpdate(req.params.id, { $push: { answers: answer._id } }, { new: true }, (err, question) => {
                    if(err){
                        return res.json(err);
                    }
                User.findByIdAndUpdate(req.session.user, { $push: { answers: answer._id }}, {new: true}, (err, user) => {
                    if (err) {
                        return res.json(err);
                    }
                return res.json(answer);
                })
            })
        }
    })
}
    show(req, res){
    	Answer.findById(req.params.id, (err, answer) => {
    		if(err){
    			return res.json({ error: '404 - Answer not found' });
    		}
    		return res.json(answer);
    	})
    }
}

module.exports = new AnswersController();
