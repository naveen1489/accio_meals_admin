import {
  postRequest,
  getRequest,
  deleteRequest,
  putRequest,
} from "../requestMethods";

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;

export const addCategory = async (categoryData) => {
  const response = await postRequest(
    `${BASE_URL}/api/admin/categories`,
    categoryData
  );
  return response;
};

export const getCategory = async () => {
  const response = await getRequest(`${BASE_URL}/api/admin/categories`);
  return response;
};

export const deleteCategory = async (categoryId) => {
  const response = await deleteRequest(
    `${BASE_URL}/api/admin/categories/${categoryId}`
  );
  return response;
};

export const editCategory = async (categoryId, updatedData) => {
  const response = await putRequest(
    `${BASE_URL}/api/admin/categories/${categoryId}`,
    updatedData
  );
  return response;
};
