import { useMutation, useQueryClient } from "@tanstack/react-query";
import {deleteAuction} from "../services/deleteAuction";

export const useDeleteAuction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAuction,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['auctions'] });
        }
    });
};