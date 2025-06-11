import {auctionDatesAPI} from './API';

export const fetchAuctionDates = async (): Promise<Date[]> => {
    const response = await auctionDatesAPI();

    return response.data.map((isoDate) => new Date(isoDate));
};