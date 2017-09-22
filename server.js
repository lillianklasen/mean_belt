var express = require('express');
var path = require('path');
var app = express();
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/dist'));
app.use(session({secret: 'codingdojorocks'}));

require('./server/config/mongoose.js');

require('./server/config/routes.js')(app);

app.listen(8000, function() {
    console.log("listening on port 8000");
})
