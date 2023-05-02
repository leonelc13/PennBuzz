const database = require('./db');

const getFeed = async (user, numberOfQuizzes) => {
    try {
        console.log("FETCHING FEED FOR USER " + user);
        let db = await database.getDb();
        const res = await db.collection('Quiz').aggregate([
            {
                $addFields:
                {
                    num_comments: { $size: "$comments" },
                    is_upvote: { $in: [user, "$upvotes"] },
                    is_downvote: { $in: [user, "$downvotes"] },
                    num_upvotes: { $size: "$upvotes" },
                    num_downvotes: { $size: "$downvotes" },
                }
            },
            { $project: { comments: 0, downvotes: 0 } }
        ]).sort({ timestamp: -1 }).limit(numberOfQuizzes);
        return res.toArray();
    } catch (err) {
        console.error(err);
        throw new Error(`Error fetching feed.`);
    }
}


// Model tree
const mainFeedDB = {
    getFeed: getFeed,
}

module.exports = mainFeedDB;