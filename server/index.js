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

const routes = require('./routes/routes');
console.log(routes);
// Direct Messaging
app.get('/channels', routes.DirectMessaging.getChannels);
app.get('/messages', routes.DirectMessaging.getMessages);
app.post('/addchannel', routes.DirectMessaging.createChannel);
app.post('/addmessage', routes.DirectMessaging.addMessage);

// Profile Page
app.get('/profile', routes.ProfilePage.getProfileByUsername);

console.log("Attempting to connect to MongoDB ");
db.connect(process.env.DATABASE_URL, async (err) => {
    if (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }

    console.log("Successfully connected to MongoDB");
    for (const apikey in routes) {
        for (const routekey in routes[apikey]) {
            const{method, path, handler} = routes[apikey][routekey]
            //app[method](path, handler)
        }
    }

    db.init().then(() => {
        app.listen(SERVER_PORT, async () => {
            runWebSocketServer();
            console.log('Server running on port', SERVER_PORT);
        });
    });
});


module.exports = app;