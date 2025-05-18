import { postRequest } from "../requestMethods";

export const login = async (username, password) => {
    const response = await postRequest(`${import.meta.env.VITE_APP_HOST_URL}/api/users/login-admin`, {
      username: `${username.trim()}`,
      password: `${password.trim()}`,
    });
    return response;
  };