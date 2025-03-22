import { postRequest } from "../requestMethods";

export const login = async (username, password) => {
    const response = await postRequest("/api/users/login-admin", {
      username: `${username.trim()}`,
      password: `${password.trim()}`,
    });
    return response;
  };