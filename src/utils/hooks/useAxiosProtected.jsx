import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
import axios from "axios";
import { useEffect } from "react";

const useAxiosProtected = () => {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const axiosProtected = axios.create({
    baseURL: "https://ax-server-ai-abir96.vercel.app",
  });

  useEffect(() => {
    axiosProtected.interceptors.request.use((config) => {
      const browserToken = localStorage.getItem("adrenalineX");
      console.log(browserToken);
      if (browserToken) {
        config.headers.Authorization = `Bearer ${browserToken}`;
      }

      return config;
    });

    axiosProtected.interceptors.response.use(
      (res) => res,
      async (error) => {
        if (
          error.response &&
          (error.response.status === 401 ||
            error.response.status === 403)
        ) {
          await logOut();
          navigate("/login");
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate, axiosProtected]);
  return { axiosProtected };
};

export default useAxiosProtected;
