import { deleteRequest, getRequest, postRequest, putRequest } from '../requestMethods';

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;


export const getallMenuDetails = async (page = 1, limit = 10) => {
    const response = await getRequest(`${BASE_URL}/api/menus/all?page=${page}&limit=${limit}`);
    return response;
};


export const reviewMenuDetails = async (data) => {
    const response = await postRequest(`${BASE_URL}/api/menus/menu/review`, data);
    return response;
}

