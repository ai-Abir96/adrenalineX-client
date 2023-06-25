import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../utils/hooks/useAuth";
import useUserRole from "../utils/hooks/useUserRole";

const InstrcutorRoute = ({ children }) => {
  const { userRole, isLoading: isRoleLoading } = useUserRole();
  const { user, loading } = useAuth();
  const location = useLocation();

  console.log(userRole?.instructor);

  if (loading || isRoleLoading) {
    return <div>Loadiing ......</div>;
  }
  if (user && userRole?.instructor) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default InstrcutorRoute;
