import MainLayout from "../layouts/MainLayout.jsx";
import ProtectedRoute from "../components/routeWrappers/ProtectedRoute.jsx";
import SpotifyUI from "../../modules/home/pages/HomePage.jsx";

const protectedRoutes = [
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { path: 'spotify', element: <ProtectedRoute><SpotifyUI></SpotifyUI></ProtectedRoute> },
        ]
    },
]

export default protectedRoutes;