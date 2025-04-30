import { postAuction } from '../services/postAuction';
import { useMutation, useQueryClient } from "@tanstack/react-query";


export const usePostAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: postAuction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auctions'] });
        }
    })
};