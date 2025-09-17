import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useSelector((state) => state.auth);
    const oauth = useSelector((state) => state.oauthSignup.status);

    if (isLoading) {
        return children;
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}