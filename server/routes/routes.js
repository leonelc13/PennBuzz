const DirectMessagingRoutes = require("./DirectMessagingRoutes");
const ProfileRoutes = require("./ProfileRoutes");
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require("./RegisterRoute");
const LeaderboardRoutes = require("./LeaderboardRoutes");
const MainFeedRoutes = require("./MainFeedRoutes");
const QuizRoutes = require("./QuizRoutes");
const SearchRoutes = require("./SearchRoutes");

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes,
    ProfilePage: ProfileRoutes,
    Login: LoginRoute,
    Register: RegisterRoute,
    MainFeed: MainFeedRoutes,
    Quiz: QuizRoutes,
    Search: SearchRoutes
}

module.exports = routes;