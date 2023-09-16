//create web server
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

//connect to database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/commentdb');

//create schema
var Schema = mongoose.Schema;
var commentSchema = new Schema({
    name: String,
    comment: String
});

//create model
var Comment = mongoose.model('Comment', commentSchema);

//use public folder
app.use(express.static('public'));

//use body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//get request
app.get('/comment', function(req, res) {
    console.log('get request');
    Comment.find({}, function(err, data) {
        if(err) {
            console.log('error: ', err);
        }
        res.send(data);
    });
});

//post request
app.post('/comment', function(req, res) {
    console.log('post request');
    console.log(req.body);

    var addedComment = new Comment(req.body);
    addedComment.save(function(err, data) {
        if(err) {
            console.log('error: ', err);
        }
        res.send(data);
    });
});

//spin up server
app.listen(3000, function() {
    console.log('listening on port 3000');
});