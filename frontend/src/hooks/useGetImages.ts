import {useQuery} from '@tanstack/react-query';
import {fetchImage} from '../services/fetchImage';

export const useGetImages = (fileId: string) => {
    return useQuery({
        queryKey: ['image', fileId],
        queryFn: async () => await fetchImage(fileId),
        staleTime: 1000 * 60 * 5
    });
};