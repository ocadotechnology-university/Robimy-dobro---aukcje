import {updateAuction} from '../services/updateAuction';
import {useMutation, useQueryClient} from "@tanstack/react-query";

export const useUpdateAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateAuction,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ['auctions']});
        }
    })
};