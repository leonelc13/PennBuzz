const model = require('../model/model');


const getQuiz = async (req, res) => {
    const { id } = req.query;
    const quiz = await model.Quiz.getQuiz(id);
    if (!quiz) {
        return res.status(401).send({ error: 'Quiz not found' });
    }

    return res.status(201).send(quiz);
}

const addComment = async (req, res) => {
    const { user, quizId, content, timestamp } = req.body;
    if (!user || !quizId || !content || !timestamp) return res.status(401).send({ err: "/addcomment: Missing arguments" });
    const response = await model.Quiz.addComment(quizId, user, content, timestamp);
    return response.acknowledged ? res.sendStatus(201) : res.sendStatus(400);
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
    deleteDownvote: deleteDownvote,
    addComment: addComment,
    getQuiz: getQuiz
}

module.exports = QuizRoutes;