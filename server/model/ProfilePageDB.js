const database = require('./db');

const getProfileByUsername = async (name) => {
    try {
        console.log(name);
        let db = await database.getDb();
        const res = await db.collection('User').findOne({ username: name });
        console.log(`User: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error finding profile for user ${name}.`);
    }
}


const profilePageDB = {
    getProfileByUsername: getProfileByUsername
}

module.exports = profilePageDB;