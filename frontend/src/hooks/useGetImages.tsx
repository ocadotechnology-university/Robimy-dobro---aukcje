import { useQuery } from '@tanstack/react-query';
import { fetchImage } from '../services/fetchImage';

export const useGetImages = (fileId: string) => {
    return useQuery({
        queryKey: ['image', fileId],
        queryFn: async () => {
            const blob = await fetchImage(fileId);
            return URL.createObjectURL(blob);
        },
        enabled: !!fileId,
    });
};