const model = require('../model/model');


const getFeed = async (req, res) => {
    const { user } = req.query;
    if (!user) return res.status(401).send({ err: "/getfeed: Missing arguments" });
    const feed = await model.MainFeed.getFeed(user, 20);
    return res.status(201).send(feed);
}

// Routes Tree
const MainFeedRoutes = {
    getFeed: getFeed,
}

module.exports = MainFeedRoutes;