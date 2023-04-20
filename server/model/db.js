const { MongoClient } = require('mongodb');

let db;

const connect = async (url, callback) => {
    try {
        const conn = (await MongoClient.connect(url, {
            useNewUrlParser: true, useUnifiedTopology: true,
        }));
        db = conn.db("PennBuzz");
        console.log(`Connected to database: ${conn.databaseName}`);
        return callback(null);
    } catch (err) {
        return callback(err);
    }
};

const init = async () => {
    // ADD COLLECTION NAMES
    const collectionNames = ["User", "Quiz", "Message", "Channel"];
    collectionNames.forEach(async (collectionName) => {
        const exists = await db.listCollections({ name: collectionName }).hasNext();

        if (!exists) {
            console.log(`Creating database with name ${collectionName}`);
            db.createCollection(collectionName);
        }
    });
};

function getDb() {
    return db;
}

module.exports = {
    init,
    connect,
    getDb
}