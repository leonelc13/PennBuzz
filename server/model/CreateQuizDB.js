const database = require('./db');

const addQuiz = async (quiz) => {
    try {
        let db = await database.getDb();
        const res = await db.collection('Quiz').insertOne(quiz);
        return res;
    } catch (err) {
        console.error(err);
        throw new Error(`Error submitting quiz.`);
    }
}

const createQuizDB = {
    addQuiz: addQuiz
}

module.exports = createQuizDB;