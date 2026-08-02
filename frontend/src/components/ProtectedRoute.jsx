import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

    // Temporary authentication check
    const isAuthenticated = localStorage.getItem("isLoggedIn") === "true";

    return isAuthenticated ? children : <Navigate to="/" replace />;

}

export default ProtectedRoute;