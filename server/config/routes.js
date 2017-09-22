var Users = require('../controllers/users');
var Questions = require('../controllers/questions');
var Answers = require('../controllers/answers');
var path = require('path');

module.exports = function(app){
    app.post('/login', Users.authenticateUser);
    app.post('/users', Users.create);
    app.delete('/users', Users.logout);
    app.get('/session', Users.session);

    app.get('/questions', Questions.index);
	app.post('/questions', Questions.create);
	app.get('/questions/:id', Questions.show);

    app.get('/answers', Answers.index);
	app.post('/questions/:id/answers', Answers.create);
	app.get('/answers/:id', Answers.show);

    app.all("*", (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}
