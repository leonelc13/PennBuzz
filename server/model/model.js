const directMessagingDB = require('./DirectMessagingDB');
const mainFeedDB = require('./MainFeedDB');
const quizDB = require('./QuizDB');
// Model Tree
const model = {
    DirectMessaging: directMessagingDB,
    MainFeed: mainFeedDB,
    Quiz: quizDB
}
module.exports = model