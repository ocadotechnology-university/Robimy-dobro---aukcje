import axios from "axios";
import { Auction } from "../components/AuctionPage/Auction";
import { auctionsAPI } from "./API";

export interface AuctionFilters {
    statuses?: string[];
    myAuctions?: boolean;
    followed?: boolean;
    dates?: string[];
}

export const fetchAuctions = async (filters: AuctionFilters): Promise<Auction[]> => {
    const response = await axios.get<Auction[]>("/api/auction", {
        params: filters,
    });
    return response.data;
};