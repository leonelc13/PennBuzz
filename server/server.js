/*
    SERVER
*/

const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
app.use(cors());
app.use(express.urlencoded(
    { extended: true },
));
app.use(bodyParser.json());

const routes = require('./routes/routes');

app.post('/login', routes.Login);
app.post('/register', routes.Register);

// Direct Messaging
app.get('/channels', routes.DirectMessaging.getChannels);
app.get('/messages', routes.DirectMessaging.getMessages);
app.post('/addchannel', routes.DirectMessaging.createChannel);
app.post('/addmessage', routes.DirectMessaging.addMessage);
// Feed
app.get('/getfeed', routes.MainFeed.getFeed);
// Search
app.get('/search', routes.Search.search);
//Quiz
app.get('/quiz', routes.Quiz.getQuiz);
app.put('/addcomment', routes.Quiz.addComment);
app.put('/addupvote', routes.Quiz.addUpvote);
app.put('/deleteupvote', routes.Quiz.deleteDownvote);
app.put('/adddownvote', routes.Quiz.addDownvote);
app.put('/deletedownvote', routes.Quiz.deleteDownvote);

// Profile Page
app.get('/profile', routes.ProfilePage.getProfileByUsername);
app.get('/profileQuizzes', routes.ProfilePage.getAllQuizzes);
app.get('/profileCreatedQuizzes', routes.ProfilePage.getCreatedQuizzes);
app.get('/profileFavoriteQuizzes', routes.ProfilePage.getFavoriteQuizzes);

// Leaderboard Page
app.get('/scores', routes.Leaderboard.getAllScores);

module.exports = app;