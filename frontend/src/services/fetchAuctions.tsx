import { Auction } from "../components/AuctionPage/Auction";
import { auctionsAPI } from "./API";

export interface AuctionFilters {
    statuses?: string[];
    myAuctions?: boolean;
    followed?: boolean;
    dates?: string[];
}

export const fetchAuctions = async (filters: AuctionFilters): Promise<Auction[]> => {
    const response = await auctionsAPI(filters);
    return response.data;
};