import { getRequest } from "../requestMethods";

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;

export const getDashboardData = async () => {
  const response = await getRequest(
    `${BASE_URL}/api/statistics/all-statistics`
  );
  return response;
};


export const getAdminMessage = async (page = 1, limit = 10) => {
  const response = await getRequest(
    `${BASE_URL}/api/users/admin/messages?page=${page}&limit=${limit}`
  );
  return response;
}