import axiosInstance from "./axiosInstance";

export const getAvailableProperties = async () => {
    const response = await axiosInstance.get("/property");
    return response.data;
};

export const getSavedProperties = async () => {
    const response = await axiosInstance.get("/property/favourites");
    return response.data;
};

export const addToFavourites = async (id) => {
    const response = await axiosInstance.post(`/property/favourites/${id}`);
    return response.data;
};

export const removeFromFavourites = async (id) => {
    const response = await axiosInstance.delete(`/property/favourites/${id}`);
    return response.data;
};