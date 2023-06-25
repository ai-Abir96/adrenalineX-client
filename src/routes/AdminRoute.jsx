import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import useUserRole from "../utils/hooks/useUserRole";

const AdminRoute = ({ children }) => {
  const { userRole, isLoading: isRoleLoading } = useUserRole();
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading || isRoleLoading) {
    return <div>Loadiing ......</div>;
  }
  if (user && userRole?.admin) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;
