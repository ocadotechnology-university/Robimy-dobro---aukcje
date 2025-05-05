import { useQuery } from '@tanstack/react-query';
import { fetchAuctions, AuctionFilters } from "../services/fetchAuctions";

export const useGetAuctions = (filters: AuctionFilters) => {
    return useQuery({
        queryKey: ["auctions", filters],
        queryFn: () => fetchAuctions(filters),
    });
};