import useAuth from "./useAuth";
import useAxiosProtected from "./useAxiosProtected";
import { useQuery } from "@tanstack/react-query";

const useUserRole = () => {
  const { user } = useAuth();
  const { axiosProtected } = useAxiosProtected();

  const { data: userRole, isLoading } = useQuery(
    ["userRole", user?.email],
    async () => {
      const response = await axiosProtected.get(
        `/user/${user?.email}`
      );
      const { result } = response.data;
      return result;
    }
  );

  return { userRole, isLoading };
};

export default useUserRole;
