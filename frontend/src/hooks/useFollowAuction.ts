import {useMutation, useQueryClient} from '@tanstack/react-query';
import {followAuctionAPI} from '../services/API';

export const useFollowAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: followAuctionAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['auctions']});
        },
    });
};