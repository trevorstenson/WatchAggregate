var express = require('express');
var bodyParser = require('body-parser');
var scrapers = require('./scrapers/control');
const path = require('path');

var listingsRouter = require('./routes/listings');

var app = express();

//enable cors for testing on localhost
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/listings', listingsRouter);

app.get('/', function (req, res) {
    res.send(JSON.stringify('get worked'))
});

//listen on port 3000
app.listen(3000, function () {
    scrapers.runScrapers();
    setInterval(scrapers.runScrapers, 300000); //5 minute interval
});

module.exports = app;