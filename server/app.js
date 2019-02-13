var express = require('express');
var db = require('./database');
var bodyParser = require('body-parser');
var scrapers = require('./scrapers/control');

var app = express();

//enable cors for testing on localhost
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//test
app.get('/', function (req, res) {
    res.send(JSON.stringify('get worked'))
});

//receives listings from backend db
app.get('/listings', function (req, res) {
    db.getDB().collection('posts').find({}).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

//gets listings from db that contain the string in the request body
app.post('/listings', function (req, res) {
        var query = {title: {$regex: req.body.title, $options: "$i"}};
        db.getDB().collection('posts').find(query).toArray(function (err, result) {
            if (err) throw err;
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
        })
});

//listen on port 3000
app.listen(3000, function () {
    scrapers.runScrapers();
    setInterval(scrapers.runScrapers, 300000); //5 minute interval
});

module.exports = app;