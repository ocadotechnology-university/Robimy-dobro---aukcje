import {useMutation, useQueryClient} from '@tanstack/react-query';
import {unfollowAuctionAPI} from '../services/API';

export const useUnfollowAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unfollowAuctionAPI,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['auctions']});
        },
    });
};
