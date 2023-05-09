/* eslint-disable */
const request = require('supertest');
const app = require('../index');
const database = require('../model/db');
require('dotenv').config();

const { app, closeServer } = require('../index');

let db;

describe('Leaderboard Tests', () => {
    afterAll(async () => {
        try {
            await closeServer();
        } catch (err) {
            console.log(err);
            return err;
        }
    });
    test('get leaderboard: valid request', async () => {
        const response = await request(app)
            .get(`/scores`)
            .send();

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true)
    });
});
