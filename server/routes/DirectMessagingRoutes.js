const model = require('../model/model');


const getChannels = async (req, res) => {
    const { user } = req.query;
    if (!user) return res.status(401).send({ err: "/channels: Missing arguments" });
    const channels = await model.DirectMessaging.getChannels(user);

    return res.status(201).send(channels);
}

const createChannel = async (req, res) => {
    const { name, members } = req.body;
    if (!name || !members) return res.sendStatus(401);
    const response = await model.DirectMessaging.createChannel(name, members);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(401);
}

const addMessage = async (req, res) => {
    console.log("Adding", req.body);
    const { sender, channel_id, timestamp, text } = req.body;
    if (!sender || !channel_id || !timestamp || !text) return res.send(401, { err: "Invalid Arguments" });
    const response = await model.DirectMessaging.addMessage(channel_id, sender, text, timestamp);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
}

const getMessages = async (req, res) => {
    const { user, channel } = req.query;
    if (!user || !channel) return res.status(401).send({ err: "/messages: Invalid user, channel provided" });
    // Check if user is in channel
    const channelQuery = await model.DirectMessaging.getChannelById(channel);
    if (channelQuery && channelQuery.members && channelQuery.members.includes(user)) {
        const messages = await model.DirectMessaging.getMessages(channel);
        return res.status(201).send(messages);
    }
    return res.status(402).send({ err: 'Invalid channel for user' });
}

// Routes Tree
const DirectMessagingRoutes = {
    getChannels: getChannels,
    createChannel: createChannel,
    addMessage: addMessage,
    getMessages: getMessages
}

module.exports = DirectMessagingRoutes;