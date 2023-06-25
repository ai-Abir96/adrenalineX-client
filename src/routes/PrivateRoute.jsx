import useAuth from "../utils/hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loadiing ......</div>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default PrivateRoute;
