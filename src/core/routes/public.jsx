// import HomePage from '../pages/HomePage';
import LoginPage from '../../modules/auth/pages/LoginPage.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import SignupPage from '../../modules/auth/pages/SignupPage.jsx';
import PublicRoute from '../components/routeWrappers/PublicRoute.jsx'

const publicRoutes = [
    {
        path: "/auth",
        element: <AuthLayout />,
        children: [
            { path: "login", element: <PublicRoute><LoginPage /></PublicRoute> },
            { path: "signup", element: <PublicRoute><SignupPage /></PublicRoute> },
        ],
    },
];

export default publicRoutes;