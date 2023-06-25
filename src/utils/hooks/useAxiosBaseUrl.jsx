import axios from "axios";

const useAxiosBaseUrl = () => {
  const axiosBase = axios.create({
    baseURL: "https://ax-server-ai-abir96.vercel.app",
  });
  return { axiosBase };
};

export default useAxiosBaseUrl;
