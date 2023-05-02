const mongo = require('../model/db');



// Routes Tree
var LeaderboardRoutes = {
    getAllScores: async (req, res) => {
        //const scores = await scoresModel.find({})
        // const scores = {message:"hi"}
        const db = mongo.getDb()
        const scores = []
        const cursor = db.collection("Scores").find({})
        await cursor.forEach((score) => {
            scores.push(score)
        })
        res.json(scores)
    }
}

module.exports = LeaderboardRoutes;