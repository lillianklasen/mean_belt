var Users = require('../controllers/users');
var Bicycles = require('../controllers/bicycles');
var path = require('path');

module.exports = function(app){
    app.post('/login', Users.authenticateUser);
    app.post('/users', Users.create);
    app.delete('/users', Users.logout);
    app.get('/session', Users.session);

    app.get('/bicycles', Bicycles.index);
	app.post('/bicycles', Bicycles.create);
	app.get('/bicycles/:id', Bicycles.show);
	app.put('/bicycles/:id', Bicycles.update);
	app.delete('/bicycles/:id', Bicycles.destroy);

    app.all("*", (req, res) => {
        res.sendFile(path.resolve('./public/dist/index.html'));
    })
}
