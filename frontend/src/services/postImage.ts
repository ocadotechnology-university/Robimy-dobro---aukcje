import {imagePostAPI} from "./API";

export const postImage = async (blob: Blob): Promise<string> => {
    const response = await imagePostAPI(blob);
    return response.data;
};