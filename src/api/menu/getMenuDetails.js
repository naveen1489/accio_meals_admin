import { deleteRequest, getRequest, putRequest } from '../requestMethods';

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;

export const getmenuDetails = async (id) => {
    const response = await getRequest(`http://localhost:3000/api/menus/restaurant/${id}`);
    return response;
};
