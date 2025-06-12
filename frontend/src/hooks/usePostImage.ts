import {useMutation} from '@tanstack/react-query';
import {postImage} from '../services/postImage';

export const usePostImages = () => {
    return useMutation({
        mutationFn: async (blob: Blob | null) => await postImage(blob)
    });
};