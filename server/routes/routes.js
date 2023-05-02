const DirectMessagingRoutes = require("./DirectMessagingRoutes")
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require("./RegisterRoute");
const LeaderboardRoutes = require("./LeaderboardRoutes");
const MainFeedRoutes = require("./MainFeedRoutes");
const QuizRoutes = require("./QuizRoutes");

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes,
    Login: LoginRoute,
    Register: RegisterRoute,
    MainFeed: MainFeedRoutes,
    Quiz: QuizRoutes
}

module.exports = routes;