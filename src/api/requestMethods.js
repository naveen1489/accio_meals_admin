import client from "./client";

export const getRequest = async (endPoint) => {
  try {
    const res = await client.get(endPoint);
    // return res.data;
    return res.data ?? res;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response;
    }
    return { error: error.message || error };
  }
};

export const postRequest = async (endPoint, data) => {
  try {
    const res = await client.post(endPoint, data);
    return res;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response;
    }
    return { error: error.message || error };
  }
};

export const patchRequest = async (endPoint, data) => {
  try {
    const res = await client.patch(endPoint, data);
    console.log("response from server", res);
    return res;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response.data;
    }
    return { error: error.message || error };
  }
};

export const putRequest = async (endPoint, data) => {
  try {
    const res = await client.put(endPoint, data);
    return res;
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response;
    }
    return { error: error.message || error };
  }
};

export const deleteRequest = async (endPoint, data) => {
  try {
    const res = await client.delete(endPoint, data);
    return res; 
  } catch (error) {
    const { response } = error;
    if (response?.data) {
      return response;
    }
    return { error: error.message || error };
  }
};