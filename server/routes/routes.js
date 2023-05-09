const DirectMessagingRoutes = require("./DirectMessagingRoutes");
const ProfileRoutes = require("./ProfileRoutes");
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require("./RegisterRoute");
const LeaderboardRoutes = require("./LeaderboardRoutes");
const CreateQuizRoutes = require("./CreateQuizRoutes");
const MainFeedRoutes = require("./MainFeedRoutes");
const QuizRoutes = require("./QuizRoutes");

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Leaderboard: LeaderboardRoutes,
    ProfilePage: ProfileRoutes,
    Login: LoginRoute,
    Register: RegisterRoute,
    CreateQuiz: CreateQuizRoutes,
    MainFeed: MainFeedRoutes,
    Quiz: QuizRoutes
}

module.exports = routes;