const DirectMessagingRoutes = require("./DirectMessagingRoutes");
const ProfileRoutes = require("./ProfileRoutes");
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require ("./RegisterRoute");
const LeaderboardRoutes = require("./LeaderboardRoutes");


// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes,
    ProfilePage: ProfileRoutes,
    Login: LoginRoute,
    Register: RegisterRoute,
}

module.exports = routes;