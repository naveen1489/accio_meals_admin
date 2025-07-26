import { postRequest } from "../requestMethods";

export const uploadImage = async (formData) => {
  try {
    const response = await postRequest('/api/image/upload', formData,{
      headers: {
          "Content-Type": "multipart/form-data",
        },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

