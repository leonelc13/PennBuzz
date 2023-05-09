/* eslint-disable */
const request = require('supertest');
const jwt = require('jsonwebtoken');
const { app, closeServer } = require('../index');
const database = require('../model/db');
require('dotenv').config();



let db;

const test_channel = {
    "name": "John Wick",
    "last_message_timestamp": "8:54pm 12/12/2023",
    "img": "https://drive.google.com/uc?export=view&id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe",
    "channel_id": "1",
    "members": ["johnwick", "johndoe"]
}

const test_message = {
    "sender": "johnwick",
    "timestamp": "8:24pm 12/12/2023",
    "text": "Hey John! How are you!",
    "channel_id": "12"
}

const insertTestData = async (test_channel, test_message) => {
    const resultAddChannel = await db.collection('Channel').insertOne(test_channel);
    if (!resultAddChannel.acknowledged) {
        console.log('warning', 'test channel was not added');
        return false;
    }

    const resultAddMessage = await db.collection('Message').insertOne(test_message);
    if (!resultAddMessage.acknowledged) {
        console.log('warning', 'test user was not added');
        return false;
    }
    return true;
};

const deleteTestData = async (test_channel) => {
    try {
        const resultDeleteChannel = await db.collection('Channel').deleteMany({ channel_id: test_channel.channel_id });
        const { numChannelDocumentsDeleted } = resultDeleteChannel;
        if (numChannelDocumentsDeleted != 1) {
            console.log('warning', 'test channel was not deleted');
        }
        const resultDeleteMessage = await db.collection('Message').deleteMany({ channel_id: test_channel.channel_id });
        const { numMessageDocumentsDeleted } = resultDeleteMessage;
        if (numMessageDocumentsDeleted != 1) {
            console.log('warning', 'test message was not deleted');
        }
    } catch (err) {
        console.log('error', err.message);
    }
};


// Direct Messaging tests
describe('Direct Messaging Tests', () => {

    beforeAll(async () => {
        await database.connect(process.env.DATABASE_URL, (err) => {
            if (err) console.error('Failed to connect to database:', err);
        });
        db = database.getDb();
        if (insertTestData(test_channel, test_message))
            console.log("Successfully inserted test data");
    });

    afterAll(async () => {
        try {
            await deleteTestData(test_channel);
            await closeServer();
        } catch (err) {
            console.log(err);
            return err;
        }
    });

    test('add channel: valid post request', async () => {

        const response = await request(app)
            .post('/addchannel')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                "name": "John Doe",
                "last_message_timestamp": "8:54pm 12/12/2023",
                "img": "https://drive.google.com/uc?export=view&id=1munwKbM6dQSWE1ruZ_41O79ZeliPXYVe",
                "channel_id": "1",
                "members": ["johndoe"]
            });
        expect(response.status).toBe(201);
    });

    test('add channel: invalid fields post request', async () => {
        const response = await request(app)
            .post('/addchannel')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                "name": "John Wick",
            });
        expect(response.status).toBe(401);
    });


    test('get channel: valid request', async () => {
        const response = await request(app)
            .get(`/channels?user=johndoe`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(201);
    });

    test('get channel: invalid arguments', async () => {
        const response = await request(app)
            .get(`/channels`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(401);
    });



    test('add message: valid request', async () => {
        const response = await request(app).post('/addmessage')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                "sender": "johndoe",
                "timestamp": "8:24pm 12/12/2023",
                "text": "Hey John! How are you!",
                "channel_id": "1"
            });
        expect(response.status).toBe(201);
    });

    test('add message: invalid arguments ', async () => {
        const response = await request(app)
            .post('/addmessage')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send({
                "sender": "johndoe",
            });
        expect(response.status).toBe(401);
    });


    test('get message: valid request', async () => {
        const response = await request(app)
            .get('/messages?user=johndoe&channel=1')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();
        expect(response.status).toBe(201);
    });

    test('get message: invalid arguments - not found', async () => {
        console.log("INVALID ARGUMENTS GET MESSAGE\n");
        const response = await request(app)
            .get('/messages?user=jonjones')
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();
        expect(response.status).toBe(401);
    });


    test('get messages: invalid request user not in channel', async () => {
        const response = await request(app)
            .get(`/messages?channel=${test_channel.channel_id}&user=jonjones`)
            .set('Content-Type', 'application/x-www-form-urlencoded')
            .send();

        expect(response.status).toBe(402);
    });
});