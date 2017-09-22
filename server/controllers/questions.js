var mongoose = require('mongoose');
var Question = mongoose.model('Question');
var User = mongoose.model('User');


class QuestionsController {
    index(req, res) {
    	Question.find({}, (err, questions) => {
    		if(err){
    			return res.json(err);
    		}
    		return res.json(questions);
    	})
    }
    create(req, res) {
        req.body.user = req.session.user;
        
    	Question.create(req.body, (err, question) => {
    		if(err){
    			return res.json(err);
    		} else {
                User.findByIdAndUpdate(req.session.user, { $push: { questions: question._id }}, {new: true}, (err, user) => {
                    if (err) {
                        console.log(err);
                    } else {
                        return res.json(question);
                    }
                })
            }
    	})
    }
    show(req, res){
    	Question.findById(req.params.id, (err, question) => {
    		if(err){
    			return res.json({ error: '404 - Question not found' });
    		}
    		return res.json(question);
    	})
    }
}

module.exports = new QuestionsController();
