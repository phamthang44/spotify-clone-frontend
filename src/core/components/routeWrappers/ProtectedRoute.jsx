import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

    if (isLoading) {
        return children;
    }

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
}