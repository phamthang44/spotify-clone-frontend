// import HomePage from '../pages/HomePage';
import LoginPage from '../../modules/auth/pages/LoginPage.jsx';
import AuthLayout from '../layouts/AuthLayout.jsx';
import SignupPage from '../../modules/auth/pages/SignupPage.jsx';
import PublicRoute from '../components/routeWrappers/PublicRoute.jsx'
import VerifyEmailPage from "../../modules/auth/pages/VerifyEmailPage.jsx";
import Privacy from '../../core/components/Privacy.jsx'

const publicRoutes = [
    {
        path: "/",
        element: <AuthLayout />,
        children: [
            { path: "login", element:
                    <PublicRoute>
                        <LoginPage />
                        <footer className="flex flex-col justify-center items-center w-full h-fit">
                            <Privacy textClass="text-[#cbc6bc] text-sm font-poppins font-[500]" className="w-full h-full p-10 bg-[#121212]"/>
                        </footer>
                    </PublicRoute> },
            { path: "signup", element:
                    <PublicRoute>
                        <SignupPage />
                        <footer className="flex flex-col justify-center items-center w-full h-fit">
                            <Privacy textClass="text-[#cbc6bc] text-xs font-poppins w-80 text-center" className="w-full h-full p-10 bg-[#121212]"/>
                        </footer>
                    </PublicRoute> },
            { path: "verify", element: <PublicRoute><VerifyEmailPage /></PublicRoute> },
        ],
    },
];

export default publicRoutes;