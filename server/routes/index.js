var router = require('express').Router();
var db = require('../database');

router.get

router.get('/listings', function (req, res) {
    var query = {title: {$regex: req.body.title, $options: "$i"}};
    db.getDB().collection('posts').find(query).toArray(function (err, result) {
        if (err) throw err;
        console.log(result);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(result));
    })
});

module.exports = router;