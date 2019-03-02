var express = require('express');
var bodyParser = require('body-parser');
var scrapers = require('./scrapers/control');
var db = require('./database');

var listingsRouter = require('./routes/listings');

var app = express();

//app.use('/listings', listingsRouter);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send(JSON.stringify('get worked'))
});

app.get('/listings/', function (req, res) {
    db.getDB().collection('posts').find({}).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

app.post('/listings/', function (req, res) {
    var query = {title: {$regex: req.body.title, $options: "$i"}};
    db.getDB().collection('posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

app.listen(3000, function () {
    scrapers.runScrapers();
    setInterval(scrapers.runScrapers, 300000); //5 minute interval
});

module.exports = app;