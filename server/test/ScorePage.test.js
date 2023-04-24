/* eslint-disable */
const request = require('supertest');
const app = require('../index');
const database = require('../model/db');
require('dotenv').config();

let db;

describe('Leaderboard Tests', () => {
    test('get leaderboard: valid request', async () => {
        const response = await request(app)
            .get(`/scores`)
            .send();

        expect(response.status).toBe(200);
        expect(Array.isArray(response.body)).toBe(true)
    });
});
