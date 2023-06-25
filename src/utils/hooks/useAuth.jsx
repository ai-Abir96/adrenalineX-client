import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

const useAuth = () => {
  const authcontext = useContext(AuthContext);
  return authcontext;
};

export default useAuth;
