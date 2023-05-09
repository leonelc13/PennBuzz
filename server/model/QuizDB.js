const database = require('./db');


const getQuiz = async (quizId) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Quiz').findOne({ id: quizId });
        console.log(`Quiz: ${JSON.stringify(res)}`);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error('Error retrieving quiz.');
    }
}

const addComment = async (quizId, user, comment, timestamp) => {
    try {
        let db = await database.getDb();
        const newComment = {
            author: user,
            content: comment,
            timestamp: timestamp
        };
        const res = await db.collection('Quiz').updateOne(
            { id: quizId },
            { $push: { comments: newComment } }
        );
        return res;
    } catch (err) {
        console.error(err);
        throw new Error('Error adding comment.');
    }
}

const addVote = async (quizId, user, is_upvote) => {
    try {
        let db = await database.getDb();
        let array_field = is_upvote ? 'upvotes' : 'downvotes';
        const res = await db.collection('Quiz').updateOne(
            { id: quizId },
            { $addToSet: { [array_field]: user } }
        );
        console.log(res);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error adding upvote.`);
    }
}

const deleteVote = async (quizId, user, is_upvote) => {
    try {
        let db = await database.getDb();
        let array_field = is_upvote ? 'upvotes' : 'downvotes';
        const res = await db.collection('Quiz').updateOne(
            { id: quizId },
            { $pull: { [array_field]: user } }
        );
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error adding upvote.`);
    }
}





// Model tree
const quizDB = {
    addComment: addComment,
    addVote: addVote,
    deleteVote: deleteVote,
    getQuiz: getQuiz
}

module.exports = quizDB;