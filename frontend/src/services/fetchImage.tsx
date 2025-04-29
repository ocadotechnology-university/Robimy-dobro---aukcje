import {imageAPI} from "./API";

export const fetchImage = async (fileId: string): Promise<Blob> => {
    const response = await imageAPI(fileId);
    return response.data;
};