import {useQuery} from '@tanstack/react-query';
import {fetchAuctions, AuctionFilters} from "../services/fetchAuctions";

export const useGetAuctions = (filters: AuctionFilters) => {
    return useQuery({
        queryKey: ["auctions", filters],
        queryFn: () => fetchAuctions(filters),
        refetchInterval: 2000,
        select: (data) => {
            const buffer = JSON.parse(sessionStorage.getItem("followedBuffer") || "{}");
            return data.map(auction => {
                if (buffer[auction.id] !== undefined) {
                    return {...auction, isFollowed: buffer[auction.id]};
                }
                return auction;
            });
        },
    });
};