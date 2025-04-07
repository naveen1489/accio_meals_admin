import {
 // postRequest,
  getRequest,
 // deleteRequest,
 // putRequest,
} from "../requestMethods";

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;


export const getNotification = async () => {
  const response = await getRequest(`${BASE_URL}/api/notifications/receiver`);
  return response;
};
