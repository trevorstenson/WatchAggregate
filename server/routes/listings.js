var router = require('express').Router();
var db = require('../database');

//gets all listings from db
router.get('/', function (req, res) {
    db.getDB().collection('posts').find({}).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        res.send(result);
    })
});

//gets listings from db that contain the specified string
router.post('/', function (req, res) {
    console.log(req.body.title);
    let query = {'title': {$regex: req.body.title, $options: 'i'}};
    db.getDB().collection('posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        result.reverse();
        res.send(result);
    });
});

module.exports = router;