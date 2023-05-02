const model = require('../model/model');

// TODO: FILL IN ADD COMMENT ROUTE
const addComment = async (req, res) => {

}

const addUpvote = async (req, res) => {
    const { user, quizId } = req.body;
    console.log(user);
    if (!user || !quizId) return res.status(401).send({ err: "/addupvote: Missing arguments" });
    const response = await model.Quiz.addVote(quizId, user, true);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
}

const deleteUpvote = async (req, res) => {
    const { user, quizId } = req.body;
    if (!user || !quizId) return res.status(401).send({ err: "/addupvote: Missing arguments" });
    const response = await model.Quiz.deleteVote(quizId, user, true);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
}

const addDownvote = async (req, res) => {
    const { user, quizId } = req.body;
    if (!user || !quizId) return res.status(401).send({ err: "/addupvote: Missing arguments" });
    const response = await model.Quiz.addVote(quizId, user, false);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
}

const deleteDownvote = async (req, res) => {
    const { user, quizId } = req.body;
    if (!user || !quizId) return res.status(401).send({ err: "/addupvote: Missing arguments" });
    const response = await model.Quiz.deleteVote(quizId, user, false);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
}

// Routes Tree
const QuizRoutes = {
    addUpvote: addUpvote,
    deleteUpvote: deleteUpvote,
    addDownvote: addDownvote,
    deleteDownvote: deleteDownvote
}

module.exports = QuizRoutes;