var mongo = require('mongoskin'),
    databaseURI = process.env.MONGOLAB_URI || process.env.MONGOLAB_URL || "mongodb://@localhost:27017/test",
    db = mongo.db(databaseURI, { native_parser: true });

db.bind('members');

module.exports = db;
