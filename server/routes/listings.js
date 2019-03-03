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
    var query = {title: {$regex: req.body.title, $options: "$i"}};
    db.getDB().collection('posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        res.setHeader('Content-Type', 'application/json');
        if (req.body.sortType === 1) {
            res.send(result);
        } else if (req.body.sortType === 2) {
            res.send(result.sort(function (a, b) {
                    let one = a.price;
                    let two = b.price;
                    if (one < two) return 1;
                    if (one > two) return -1;
                    return 0;
                })
            )
        }
    });
});

module.exports = router;