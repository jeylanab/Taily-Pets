// ProtectedRoute.jsx
import { useUser } from "./UserContext";

const ProtectedRoute = ({ children, allowedRoles, openLoginModal }) => {
  const { user, role, loading } = useUser();

  if (loading) return <div className="p-6 text-center">Loading...</div>;

  if (!user) {
    // Open modal if user not logged in
    if (openLoginModal) openLoginModal(); 
    return null; // don't render children
  }

  if (allowedRoles && !allowedRoles.includes(role || "user")) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
