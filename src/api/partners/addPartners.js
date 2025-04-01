import { postRequest } from "../requestMethods";

export const addPartners = async (partnerData) => {
  const response = await postRequest(
    `http://localhost:3000/api/restaurants/add-partner`,
    partnerData
  );
  return response; 
};
