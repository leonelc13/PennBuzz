const DirectMessagingRoutes = require("./DirectMessagingRoutes");
const LeaderboardRoutes = require("./LeaderboardRoutes");

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes
}

module.exports = routes;