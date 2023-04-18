const DirectMessagingRoutes = require("./DirectMessagingRoutes")
const LoginRoute = require("./LoginRoute");
const RegisterRoute = require ("./RegisterRoute");

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Login: LoginRoute,
    Register: RegisterRoute
}

module.exports = routes;