// Create web server
var express = require('express'),
    app = express(),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Comment = require('./api/models/commentsModel'),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Commentsdb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/commentsRoutes'); //importing route
routes(app); //register the route

app.listen(port);

console.log('Comments RESTful API server started on: ' + port);
