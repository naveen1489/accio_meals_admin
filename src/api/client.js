import axios from "axios";

const jwt = import.meta.env.VITE_APP_JWT;

const client = axios.create({
  baseURL: import.meta.env.VITE_APP_HOST_URL,
  headers: {
    Authorization: `Bearer ${jwt}`,
  },
});

export default client;
