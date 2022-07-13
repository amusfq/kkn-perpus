import axios from "axios";
import Cookies from "js-cookie";

const Axios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
});
Axios.interceptors.request.use((config: any) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = token;
  }
  return config;
});

export default Axios;
