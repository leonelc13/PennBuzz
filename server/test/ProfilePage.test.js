/* eslint-disable */
const request = require('supertest');
const { app, closeServer } = require('../index');
const database = require('../model/db');
require('dotenv').config();

let db;

describe('ProfilePage Tests', () => {

    beforeAll(async () => {
        await database.connect(process.env.DATABASE_URL, (err) => {
            if (err) console.error('Failed to connect to database:', err);
        });
        db = database.getDb();
    });

    afterAll(async () => {
        try {
            await closeServer();
        } catch (err) {
            console.log(err);
            return err;
        }
    });

    /*test('get profile: valid request', async () => {
        const response = await request(app)
            .get(`/profile?user=johnwick`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });*/

    test('get profile: invalid arguments', async () => {
        const response = await request(app)
            .get(`/profile?user=nonexistant`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(401);
    });

    test('get quizzes: all quizzes', async () => {
        const response = await request(app)
            .get(`/profileQuizzes`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });

    test('get profile: invalid arguments', async () => {
        const response = await request(app)
            .get(`/profileCreatedQuizzes`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });

    test('get profile: invalid arguments', async () => {
        const response = await request(app)
            .get(`/profileFavoriteQuizzes`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });
});
