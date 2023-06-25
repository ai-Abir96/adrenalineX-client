import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosProtected from "./useAxiosProtected";

const useRoleVarification = (role) => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();
  const { data: isRole, isLoading: isRoleLoading } = useQuery(
    ["isRole", user?.email],
    async () => {
      try {
        const res = await axiosProtected.get(`/user/${user?.email}`);
        const result = res.data.result;
        console.log(result);
        if (result.role === role) {
          return true;
        } else {
          return false;
        }
      } catch (error) {
        console.error("Error checking user role:", error);
        return false;
      }
    }
  );

  return { isRole, isRoleLoading };
};

export default useRoleVarification;
