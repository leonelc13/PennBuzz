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

const routes = require('./routes/routes');
console.log(routes);
// Direct Messaging
app.get('/channels', routes.DirectMessaging.getChannels);
app.get('/messages', routes.DirectMessaging.getMessages);
app.post('/addchannel', routes.DirectMessaging.createChannel);
app.post('/addmessage', routes.DirectMessaging.addMessage);

// Profile Page
app.get('/profile', routes.ProfilePage.getProfileByUsername);
app.get('/profileQuizzes', routes.ProfilePage.getAllQuizzes);
app.get('/profileCreatedQuizzes', routes.ProfilePage.getCreatedQuizzes);
app.get('/profileFavoriteQuizzes', routes.ProfilePage.getFavoriteQuizzes);

// Create Quiz
app.post('/create_quiz/test', routes.CreateQuiz.addQuiz);

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
    });
});

// Shuts down both servers
const closeServer = async () => {
    await server.close();
    await socketServer.close();
};

module.exports = { app, closeServer};