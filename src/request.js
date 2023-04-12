import axios from "axios";
import router from "./router";

axios.defaults.baseURL = "http://localhost:3000";

const token = localStorage.getItem("token");

if (token) {
  axios.defaults.headers["Authorization"] = `Bearer ${token}`;
}

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    router.replace("/login");

    return Promise.reject(error);
  }
);

export default axios;
