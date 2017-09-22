var mongoose = require('mongoose');
var User = mongoose.model('User');
var bcrypt = require('bcrypt');

class UsersController {
    create(req, res) {
        if(req.body.password != req.body.password_confirm){
            return res.json({
                errors: {
                    password: {
                        message: 'Passwords must match.'
                    }
                }
            })
        }

        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));

        User.create(req.body, (err, user) => {
            if(err) {
                return res.json(err);
            }
            req.session.user = user._id;
            return res.json(user);
        })
    }

    authenticateUser(req, res) {
        User.findOne({email: req.body.email}, (err, user) => {

            if(err){
                return res.json(err);
            }
            if(user && user.authenticate(req.body.password)) {
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
        if(req.session.user){
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
