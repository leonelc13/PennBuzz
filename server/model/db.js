const { MongoClient } = require('mongodb');

let db;

const connect = async (url, callback) => {
    try {
        const conn = (await MongoClient.connect(url, {
            useNewUrlParser: true, useUnifiedTopology: true,
        }));
        db = conn.db("PennBuzz");
        console.log(`Connected to database: ${conn.databaseName}`);
        return callback(null, conn);
    } catch (err) {
        return callback(err);
    }
};

const init = async () => {
    // ADD COLLECTION NAMES
    const collectionNames = ["User", "Quiz", "Message"];
    for (const collectionName of collectionNames) {
        const exists = await db.listCollections({ name: collectionName }).hasNext();

        if (!exists) {
            console.log(`Creating database with name ${collectionName}`);
            await db.createCollection(collectionName);
        }
    }
};

function getDb() {
    return db;
}

module.exports = {
    init,
    connect,
    getDb
}