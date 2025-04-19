import axios from "axios";

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_URL,
});

client.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// response interceptor to handle token expiration
client.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      (error.response.data.message === "Token expired" ||
        error.response.data.message === "Invalid token")
    ) {
      localStorage.removeItem("token");
      localStorage.removeItem("adminName");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default client;
