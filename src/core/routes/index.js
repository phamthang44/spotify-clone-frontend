import publicRoutes from './public.jsx';
import protectedRoutes from './protected.jsx';


const routes = [
    ...publicRoutes,
    ...protectedRoutes,
];

export default routes;
