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

export const FALLBACK_IMAGE_URL = "https://cdn.blinkdish.com/1753807869706_ad638acf-4a8d-4d69-81e5-c805d265941d.png";