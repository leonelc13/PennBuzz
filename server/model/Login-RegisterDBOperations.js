const db = require('./db').getDb();

const getUser = async(username) => {
    try {
        const result = await db.collection('User').findOne({name: username});
        console.log(`User: ${JSON.stringify(result)}`);
        return result;
    } catch (err) {
        console.log(`error: ${err.message}`);
    }
};

const registerUser = async (newUser) => {
    const result = await db.collection('User').insertOne(newUser);
    return result.username;
};

module.exports = {
    getUser,
    registerUser
}