const database = require('./db');

// TODO: Implement method
const addComment = async (user, comment, timestamp) => {

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
    deleteVote: deleteVote
}

module.exports = quizDB;