/* eslint-disable */
const request = require('supertest');
const app = require('../index');
const database = require('../model/db');
require('dotenv').config();

let db;

describe('ProfilePage Tests', () => {
    test('get profile: valid request', async () => {
        const response = await request(app)
            .get(`/profile?user=johnwick`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });

    test('get profile: invalid arguments', async () => {
        const response = await request(app)
            .get(`/profile?user=nonexistant`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(401);
    });
});
