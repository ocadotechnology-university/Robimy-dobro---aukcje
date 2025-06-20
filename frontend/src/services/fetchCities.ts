import {citiesAPI} from './API';

export const fetchCities = async (): Promise<string[]> => {
    try {
        const response = await citiesAPI();
        console.log("Response from /cities:", response.data);
        return response.data;
    } catch (error) {
        console.error("fetchCities failed:", error);
        throw error;
    }
};