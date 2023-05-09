const directMessagingDB = require('./DirectMessagingDB');
const profilePageDB = require('./ProfilePageDB');
const createQuizDB = require('./CreateQuizDB');
console.log("ADD", directMessagingDB);

const mainFeedDB = require('./MainFeedDB');
const quizDB = require('./QuizDB');
// Model Tree
const model = {
    DirectMessaging: directMessagingDB,
    MainFeed: mainFeedDB,
    ProfilePage: profilePageDB,
    CreateQuiz: createQuizDB,
    Quiz: quizDB,
    ProfilePage: profilePageDB
}
module.exports = model