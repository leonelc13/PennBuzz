const directMessagingDB = require('./DirectMessagingDB');
console.log("ADD", directMessagingDB);
// Model Tree
const model = {
    DirectMessaging: directMessagingDB
}
module.exports = model