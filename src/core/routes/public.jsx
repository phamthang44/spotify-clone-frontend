// import HomePage from '../pages/HomePage';
import LoginPage from '../../modules/auth/pages/LoginPage.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import SignupPage from '../../modules/auth/pages/SignupPage.jsx';
import PublicRoute from '../components/routeWrappers/PublicRoute.jsx'
import VerifyEmailPage from "../../modules/auth/pages/VerifyEmailPage.jsx";

const publicRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <PublicRoute><LoginPage /></PublicRoute> },
            { path: "signup", element: <PublicRoute><SignupPage /></PublicRoute> },
            { path: "verify", element: <PublicRoute><VerifyEmailPage /></PublicRoute> },
        ],
    },
];

export default publicRoutes;