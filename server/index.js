/**
 * 
 *    PENN BUZZ SERVER
 *  
 **/

const SERVER_PORT = 3000;
const MONGO_URL = "mongodb://localhost:27017";
const jwt = require('jsonwebtoken');
const app = require('./server');
const socketServer = require('./socketServer');
require('dotenv').config();
const db = require('./model/db');


const searchTrie = require('./SearchTrie');



console.log("Attempting to connect to MongoDB ");
db.connect(process.env.DATABASE_URL, async (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }

    console.log("Successfully connected to MongoDB");
    /*for (const apikey in routes) {
        for (const routekey in routes[apikey]) {
            const{method, path, handler} = routes[apikey][routekey]
            //app[method](path, handler)
         }
      }*/
});


const server = app.listen(SERVER_PORT, async () => {
    console.log('Server running on port', SERVER_PORT);
    await db.connect(process.env.DATABASE_URL, async (err) => {
        if (err) {
            console.error('Failed to connect to MongoDB:', err);
            process.exit(1);
        }
        await db.init().then(() => {
            console.log("Successfully initialized MongoDB");
        });

        await searchTrie.populate();
    });
});

// Shuts down both servers
const closeServer = async () => {
    await server.close();
    await socketServer.close();
};

module.exports = { app, closeServer };