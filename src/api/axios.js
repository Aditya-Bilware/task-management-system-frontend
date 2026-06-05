import axios from "axios";

const API = axios.create({
  // baseURL: "http://localhost:5000/api",
  // baseURL: "https://task-management-system-8dvg.onrender.com/api",
  // baseURL: import.meta.env.VITE_API_URL,
  baseURL: "https://task-management-system-8dvg.onrender.com/api",
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    // console.log("running");
    // console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default API;
