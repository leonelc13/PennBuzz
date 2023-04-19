const { getDb } = require('./db');


const getUser = async(username) => {
    const db = getDb();
    try {
        const result = await db.collection('User').findOne({name: username});
        console.log(`User: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
};

const registerUser = async (newUser) => {
    const db = getDb();
    try {
        const result = await db.collection('User').insertOne(newUser);
        console.log('after inserting');
        return result;

    } catch (err) {
        console.log(err);
    }
    console.log('after inserting');
};

module.exports = {
    getUser,
    registerUser
}