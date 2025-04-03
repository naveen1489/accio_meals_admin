import { deleteRequest, getRequest, putRequest } from '../requestMethods';

const BASE_URL = import.meta.env.VITE_APP_HOST_URL;

export const getPartners = async () => {
    const response = await getRequest(`${BASE_URL}/api/restaurants`);
    return response;
};

export const editPartners = async (partnerId, updatedData) => {
    const response = await putRequest(
        `${BASE_URL}/api/restaurants/${partnerId}`,
        updatedData 
    );
    return response;
};

export const deletePartner = async (partnerId) => {
    const response = await deleteRequest(`${BASE_URL}/api/restaurants/${partnerId}`);
    return response;
};
