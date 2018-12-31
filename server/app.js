var express = require('express');
var scrapers = require('./scrapers/control');

var app = express();

app.listen(3000, function () {
    scrapers.runScrapers();
    setInterval(scrapers.runScrapers, 300000); //1 minute interval
});

module.exports = app;