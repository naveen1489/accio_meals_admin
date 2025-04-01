import { postRequest } from "../requestMethods";

const BASE_URL = import.meta.env.VITE_APP_HOST_URL; 

export const addPartners = async (partnerData) => {
  const response = await postRequest(
    `${BASE_URL}/api/restaurants/add-partner`, 
    partnerData
  );
  return response; 
};
