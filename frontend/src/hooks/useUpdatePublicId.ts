import { updatePublicId } from '../services/updatePublicId';
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdatePublicId = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePublicId,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auctions'] });
        }
    })
};