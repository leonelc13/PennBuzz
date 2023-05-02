const directMessagingDB = require('./DirectMessagingDB');
const profilePageDB = require('./ProfilePageDB');
const mainFeedDB = require('./MainFeedDB');
const quizDB = require('./QuizDB');
// Model Tree
const model = {
    DirectMessaging: directMessagingDB,
    MainFeed: mainFeedDB,
    Quiz: quizDB
    ProfilePage: profilePageDB
}
module.exports = model