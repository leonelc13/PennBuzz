const directMessagingDB = require('./DirectMessagingDB');
const profilePageDB = require('./ProfilePageDB');
console.log("ADD", directMessagingDB);
// Model Tree
const model = {
    DirectMessaging: directMessagingDB,
    ProfilePage: profilePageDB
}
module.exports = model