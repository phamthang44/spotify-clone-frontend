import { Routes, Route } from "react-router-dom";
import routes from "./index.js";
function AppRoutes() {
    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                >
                    {route.children?.map((child) => (
                        <Route
                            key={child.path}
                            path={child.path}
                            element={child.element}
                        />
                    ))}
                </Route>
            ))}
        </Routes>
    );
}

export default AppRoutes;
