var reddit = require('./reddit');
var wus = require('./wus');

module.exports = {
    runScrapers: function () {
        reddit();
        wus();
    }
};