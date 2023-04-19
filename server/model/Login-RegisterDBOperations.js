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
    console.log(newUser);
    console.log('hellow from registerUser');
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