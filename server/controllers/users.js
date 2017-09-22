var mongoose = require('mongoose');
var User = mongoose.model('User');

class UsersController {
    create(req, res) {
        User.create(req.body, (err, user) => {
            if(err) {
                return res.json(err);
            }
            req.session.user = user._id;
            return res.json(user);
        })
    }

    authenticateUser(req, res) {
        User.findOne({name: req.body.name}, (err, user) => {

            if(err){
                return res.json(err);
            }
            if(user) {
                req.session.user = user._id;
                return res.json(user);
            }
            return res.json({
                errors: {
                    login: {
                        message: 'Invalid credentials'
                    }
                }
            })
        })
    }

    session(req, res) {
        if(!req.session.user){
            return res.json({status: true});
        }
        User.findById(req.session.user, (err, user) => {
            if(err){
                return res.json(err);
            }
            return res.json(user);
        })
    }

    logout(req, res) {
        delete req.session.user;
        return res.json({status: true});
    }
}

module.exports = new UsersController();
