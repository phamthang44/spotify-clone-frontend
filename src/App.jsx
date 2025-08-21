import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./core/routes/AppRoutes.jsx";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { refresh } from "./modules/auth/services/authService.js";

function App() {
    const dispatch = useDispatch();


    useEffect(() => {
        const initAuth = async () => {
            await refresh(); // thử lấy accessToken từ cookie
        };
        initAuth();
    }, [dispatch]);
  return (
      <Router>
          <AppRoutes />
      </Router>
  )
}

export default App
