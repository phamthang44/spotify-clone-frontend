import publicRoutes from './public.jsx';
import protectedRoutes from './protected.jsx';


const routes = [
    ...publicRoutes,
    ...protectedRoutes,
];

export default routes;
// {
//     path: "/auth",
//         element: <AuthLayout />, // login, signup
//     children: [
//     { path: "login", element: <PublicRoute><LoginPage /></PublicRoute> },
//     { path: "signup", element: <PublicRoute><SignupPage /></PublicRoute> }
// ]
// },
// {
//     path: "/",
//     element: <MainLayout />, // mọi route chính đều qua đây
//     children: [
//         { path: "", element: <HomePage /> }, // public homepage
//         { path: "explore", element: <ExplorePage /> },
//         {
//             path: "dashboard",
//             element: <PrivateRoute><Dashboard /></PrivateRoute>
//         },
//         {
//             path: "artist",
//             element: <RoleRoute roles={["artist"]}><ArtistLayout /></RoleRoute>,
//             children: [
//                 { path: "upload", element: <UploadSong /> },
//                 { path: "stats", element: <ArtistStats /> }
//             ]
//         }
//     ]
// }