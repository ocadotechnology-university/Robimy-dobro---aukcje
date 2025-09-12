import {auctionDatesAPI} from './API';

export const fetchAuctionDates = async (): Promise<Date[]> => {
    try {
        const response = await auctionDatesAPI();
        return response.data.map((isoDate) => new Date(isoDate));
    } catch (error) {
        console.error("fetchAuctionDates failed:", error);
        throw error;
    }
};