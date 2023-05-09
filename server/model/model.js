const directMessagingDB = require('./DirectMessagingDB');
const profilePageDB = require('./ProfilePageDB');
const createQuizDB = require('./CreateQuizDB');
console.log("ADD", directMessagingDB);
// Model Tree
const model = {
    DirectMessaging: directMessagingDB,
    ProfilePage: profilePageDB,
    CreateQuiz: createQuizDB
}
module.exports = model