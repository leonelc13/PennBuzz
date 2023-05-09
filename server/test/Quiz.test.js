/* eslint-disable */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app, closeServer } = require('../index');
const database = require('../model/db');
require('dotenv').config();




const test_quiz = {

    "title": "Which Penn Professor are you?",
    "author_name": "johnwick",
    "author_img": "https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download",
    "description": "Complete this quiz and find out your soulmate professor at Penn!",
    "upvotes": [],
    "downvotes": [],
    "labels": [
        "Penn",
        "Professors"
    ],
    "timestamp": "99999999",
    "thumbnail_img": "https://drive.google.com/uc?id=1Guf_k6yMjbbhvPU8A77tNhj9-plnW726",
    "key": "Which Penn Professor are you?-12/12/2023-johnwick-1",
    "id": "johnwick99999999",
    "comments": [
        {
            "id": 1,
            "author": "AdamSmith",
            "content": "So fun!"
        },
        {
            "id": 2,
            "author": "johnwick",
            "content": "enjoy!"
        },
        {
            "id": 3,
            "author": "carguy",
            "content": "I disagree with my results"
        },
        {
            "id": 4,
            "author": "mario64",
            "content": "Its-a me!"
        }
    ],
    "questions": [
        {
            "question": "Question 1 content",
            "answers": [
                "Answer 1 content",
                "Answer 2 content",
                "Answer 3 content",
                "Answer 4 content"
            ]
        },
        {
            "question": "Question 2 content",
            "answers": [
                "Answer 1 content",
                "Answer 2 content",
                "Answer 3 content",
                "Answer 4 content"
            ]
        },
        {
            "question": "Question 3 content",
            "answers": [
                "Answer 1 content",
                "Answer 2 content",
                "Answer 3 content",
                "Answer 4 content"
            ]
        },
        {
            "question": "Question 4 content",
            "answers": [
                "Answer 1 content",
                "Answer 2 content",
                "Answer 3 content",
                "Answer 4 content"
            ]
        }
    ]
}

const insertTestData = async () => {
    const resultAddQuiz = await db.collection('Quiz').insertOne(test_quiz);
    if (!resultAddQuiz.acknowledged) {
        console.log('warning', 'test quiz was not added');
        return false;
    }
    return true;
};

const deleteTestData = async () => {
    try {
        const { numQuizDocumentsDeleted } = await db.collection('Channel').deleteOne({ id: test_quiz.id });
        if (numQuizDocumentsDeleted != 1) {
            return console.log('warning', 'test quiz was not deleted');
        }
    } catch (err) {
        console.log('error', err.message);
    }
    console.log('test quiz was successfully deleted');
};


// Direct Messaging tests
describe('Main Feed Tests', () => {

    beforeAll(async () => {
        await database.connect(process.env.DATABASE_URL, (err) => {
            if (err) console.error('Failed to connect to database:', err);
        });
        db = database.getDb();
        if (insertTestData())
            console.log("Successfully inserted test data");
    });

    afterAll(async () => {
        try {
            await deleteTestData();
            await closeServer();
        } catch (err) {

            console.log(err);
            return err;
        }
    });

    test('add upvote: valid request', async () => {

        const response = await request(app)
            .put(`/addupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id, "user": test_quiz.author_name });
        expect(response.status).toBe(201);
    });

    test('add upvote: invalid request - missing user', async () => {

        const response = await request(app)
            .put(`/addupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id });
        expect(response.status).toBe(401);
    });

    test('add upvote: invalid request - missing quiz', async () => {

        const response = await request(app)
            .put(`/addupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "user": test_quiz.author_name });
        expect(response.status).toBe(401);
    });

    test('delete upvote: valid request', async () => {

        const response = await request(app)
            .put(`/deleteupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id, "user": test_quiz.author_name });
        expect(response.status).toBe(201);
    });

    test('delete upvote: invalid request - missing user', async () => {

        const response = await request(app)
            .put(`/deleteupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id });
        expect(response.status).toBe(401);
    });

    test('delete upvote: invalid request - missing quiz', async () => {

        const response = await request(app)
            .put(`/deleteupvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "user": test_quiz.author_name });
        expect(response.status).toBe(401);
    });


    test('add downvote: valid request', async () => {

        const response = await request(app)
            .put(`/adddownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id, "user": test_quiz.author_name });
        expect(response.status).toBe(201);
    });

    test('add downvote: invalid request - missing user', async () => {

        const response = await request(app)
            .put(`/adddownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id });
        expect(response.status).toBe(401);
    });

    test('add downvote: invalid request - missing quiz', async () => {

        const response = await request(app)
            .put(`/adddownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "user": test_quiz.author_name });
        expect(response.status).toBe(401);
    });

    test('delete downvote: valid request', async () => {

        const response = await request(app)
            .put(`/deletedownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id, "user": test_quiz.author_name });
        expect(response.status).toBe(201);
    });

    test('delete downvote: invalid request - missing user', async () => {

        const response = await request(app)
            .put(`/deletedownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "quizId": test_quiz.id });
        expect(response.status).toBe(401);
    });

    test('delete downvote: invalid request - missing quiz', async () => {

        const response = await request(app)
            .put(`/deletedownvote`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({ "user": test_quiz.author_name });
        expect(response.status).toBe(401);
    });

});