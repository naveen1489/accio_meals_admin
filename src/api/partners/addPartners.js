import axios from "axios";
import { postRequest } from "../requestMethods";

// export const addPartners = async (partnerData) => {
//   const token = localStorage.getItem('token');

//   try {
//     const response = await axios.post(
//       'http://localhost:3000/api/restaurants/add-partner',
//       partnerData,
//       {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const addPartners = async (partnerData) => {
  const response = await postRequest(
    `http://localhost:3000/api/restaurants/add-partner`,
    partnerData
  );
  return response;
};
