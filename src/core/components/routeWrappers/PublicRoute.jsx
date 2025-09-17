import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function PublicRoute({ children }) {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const oAuthSignupData = useSelector((state) => state.oauthSignup);
    if (isAuthenticated && !oAuthSignupData) {
        return <Navigate to="/spotify" replace />;
    }
    return children;
}