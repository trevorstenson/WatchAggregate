let mongo = require('mongodb');
let MongoClient = mongo.MongoClient;
let dbname = "watches3";
let url = "mongodb://localhost:27017/" + dbname;

let _db;

module.exports = {
    //insert a new sale listing into the database
    addListing: function (obj) {
        if (_db) {
            _db.collection('posts').updateOne(
                {title: obj.title},
                {$set: {'link': obj.link, 'price': obj.price}},
                {upsert: true})
        }
    },

    //connects to the db and return the db object
    connectToServer: function (callback) {
        if (_db) {
            console.warn('Trying to connect again!');
            return callback(null, _db);
        }

        MongoClient.connect(url, function (err, db) {
            _db = db.db(dbname);
            return callback(null, _db);
        });
    },

    //gets the db object
    getDB: function () {
        return _db;
    }
};