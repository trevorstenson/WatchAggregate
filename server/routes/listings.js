var router = require('express').Router();
var db = require('../database');

router.get('/', function (req, res) {
    db.getDB().collection('posts').find({}).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

router.post('/', function (req, res) {
    var query = {title: {$regex: req.body.title, $options: "$i"}};
    db.getDB().collection('posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

module.exports = router;