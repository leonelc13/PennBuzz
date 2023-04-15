/**
 * 
 *    PENN BUZZ SERVER
 *  
 **/

const SERVER_PORT = 8000;
const MONGO_URL = "ADD URL";
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const app = require('./server');
const db = require('./model/db');


db.connect(MONGO_URL, (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }

    app.listen(SERVER_PORT, async () => {
        await db.init();
        console.log('Server running on port', SERVER_INIT);
    });
});
