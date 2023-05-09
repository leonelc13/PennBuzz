const request = require('supertest');
const database = require('../model/db');
require('dotenv').config();
const { app, closeServer } = require('../index');

const testQuizID = "99999999";
let db;

const deleteTestData = async () => {
    try {
        const { numQuizDocumentsDeleted } = await db.collection('Quiz').deleteOne({ id: testQuizID });
        if (numQuizDocumentsDeleted != 1) {
            return console.log('warning', 'test quiz was not deleted');
        }
    } catch (err) {
        console.log('error', err.message);
    }
    console.log('test quiz was successfully deleted');
};

// Create Quiz Tests
describe('Create Quiz Tests', () => {

    beforeAll(async () => {
        await database.connect(process.env.DATABASE_URL, (err) => {
            if (err) console.error('Failed to connect to database:', err);
        });
        db = database.getDb();
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

    test('addQuiz: valid request', async () => {
        const quizData = {
          id: testQuizID,
          title: 'Test Quiz',
          description: 'This is a test quiz',
          type: 'test',
          author_name: 'Test User',
          author_img: 'https://drive.google.com/uc?id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe&export=download',
          labels: [],
          upvotes: [],
          downvotes: [],
          comments: [],
          key: 'Test Quiz-' + new Date().toISOString() + '-Test User',
          timestamp: new Date().toISOString(),
          thumbnail_img: 'https://drive.google.com/uc?id=13Qc1LPJwp0149WzGAnS5QFWe5h8m4yR2&export=download',
          questions: [
            {
              id: 1,
              image: 'https://drive.google.com/uc?id=1TLUEvbO6LEFrOFFMEPnTegtep673Jas5&export=download',
              question: 'What is 1+1?',
              options: [
                { option: '2', correct: true },
                { option: '3', correct: false },
                { option: '4', correct: false },
                { option: '5', correct: false },
              ],
            },
          ],
        };
    
        const response = await request(app).post('/create_quiz/test')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send(quizData);
        expect(response.status).toBe(201);
    });
});
