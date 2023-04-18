/**
 * 
 *    PENN BUZZ SERVER
 *  
 **/

const SERVER_PORT = 3000;
const MONGO_URL = "mongodb://localhost:27017";
const jwt = require('jsonwebtoken');
const { app, runWebSocketServer } = require('./server');
require('dotenv').config();
const db = require('./model/db');

console.log("Attempting to connect to MongoDB ");
db.connect(process.env.DATABASE_URL, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
    console.log("Successfully connected to DynamoDB");
    app.listen(SERVER_PORT, async () => {
        await db.init();
        runWebSocketServer();
        console.log('Server running on port', SERVER_PORT);
    });
});
