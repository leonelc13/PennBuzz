const database = require('./db');

const getChannels = async (user) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Channel').find({ members: { $elemMatch: { $eq: user } } });
        return res.toArray();
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching channels for user ${user}.`);
    }
}

const createChannel = async (name, members) => {
    try {
        let db = await database.getDb();
        const channel = { name: name, members: members }

        const res = await db.collection('Channel').insertOne(channel);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error creating new channel ${name}.`);
    }
}

const getChannelById = async (channel) => {
    try {
        let db = await database.getDb();
        if (typeof channel !== 'string') {
            channel = channel.toString();
        }
        console.log("CJAMME:", channel)
        const res = await db.collection('Channel').findOne({
            channel_id: channel
        });
        console.log("RES", res);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching channels with channel id: ${channel_id}.`);
    }
}

const addMessage = async (channel, sender, text, timestamp) => {
    try {
        let db = await database.getDb();
        const message = { channel_id: channel, sender: sender, text: text, timestamp: timestamp };
        const res = await db.collection('Message').insertOne(message);
        console.log("Added message!");
        return res;
    } catch (err) {
        console.error("ERROR", err);
        throw new Error(`Error adding message sent by ${sender} in channel ${channel} at ${timestamp}.`);
    }
}

const getMessages = async (channel_id) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Message').find({ channel_id: channel_id });
        return res.toArray();
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching post with id ${timestamp}.`);
    }
}



// Model tree
const directMessagingDB = {
    getChannels: getChannels,
    createChannel: createChannel,
    addMessage: addMessage,
    getMessages: getMessages,
    getChannelById: getChannelById
}

module.exports = directMessagingDB;