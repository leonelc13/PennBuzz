const { MongoClient } = require('mongodb');
const scoresSeeds = require("./scores-seeds.json")

let db;

const connect = async (url, callback) => {
    try {
        const conn = (await MongoClient.connect(url, {
            useNewUrlParser: true, useUnifiedTopology: true,
        }));
        db = conn.db("PennBuzz");
        console.log(`Connected to database: ${db.databaseName}`);
        return callback(null, conn);
    } catch (err) {
        console.log(err);
    }
};

const init = async () => {
    // ADD COLLECTION NAMES
    const collectionNames = ["User", "Quiz", "Message", "Scores", "Channel"];
    const collectionSeeds = [[], [], [], scoresSeeds];
    collectionNames.forEach(async (collectionName, i) => {
        const exists = await db.listCollections({ name: collectionName }).hasNext();
        if (!exists) {
            console.log(`Creating database with name ${collectionName}`);
            const collection = await db.createCollection(collectionName);
            if (collectionSeeds[i].length > 0) collection.insertMany(collectionSeeds[i]);
        }
    })
};

function getDb() {
    return db;
}

module.exports = {
    init,
    connect,
    getDb
}