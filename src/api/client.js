import axios from "axios";

const jwt = import.meta.env.VITE_APP_JWT;
const token = localStorage.getItem("token");
const client = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_URL,
  headers: {
    Authorization: `Bearer ${token || ""}`,
  },
});

export default client;
