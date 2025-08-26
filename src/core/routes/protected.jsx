import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/routeWrappers/ProtectedRoute.jsx";
import HomePage from "../../modules/home/pages/HomePage.jsx";

const protectedRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: '/', element: <ProtectedRoute><HomePage></HomePage></ProtectedRoute> },
        ]
    },
]

export default protectedRoutes;