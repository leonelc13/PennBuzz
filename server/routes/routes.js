const DirectMessagingRoutes = require("./DirectMessagingRoutes")
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require ("./RegisterRoute");
const LeaderboardRoutes = require("./LeaderboardRoutes");


// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes,
    Login: LoginRoute,
    Register: RegisterRoute
}

module.exports = routes;