import { deleteRequest, getRequest, putRequest } from '../requestMethods';

export const getPartners = async () => {
    const response = await getRequest('http://localhost:3000/api/restaurants');
    return response;
};


export const editPartners = async (partnerId) => {
    const response = await putRequest(`http://localhost:3000/api/restaurants/${partnerId}`);
    return response;
};


export const deletePartner = async (partnerId) => {
    const response = await deleteRequest(`http://localhost:3000/api/restaurants/${partnerId}`);
    return response;
};