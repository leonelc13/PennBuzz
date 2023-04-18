import DirectMessagingRoutes from "./DirectMessagingRoutes";
import LoginRoute from "./LoginRoute";
import RegisterRoute from "./RegisterRoute";

// Routes Tree
var routes = {
    DirectMessaging: DirectMessagingRoutes,
    Login: LoginRoute,
    Register: RegisterRoute
}

module.exports = routes;