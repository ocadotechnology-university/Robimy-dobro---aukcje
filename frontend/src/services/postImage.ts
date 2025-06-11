import {imagePostAPI} from "./API";

export const postImage = async (blob: Blob | null): Promise<string> => {
    const response = await imagePostAPI(blob);
    return response.data;
};