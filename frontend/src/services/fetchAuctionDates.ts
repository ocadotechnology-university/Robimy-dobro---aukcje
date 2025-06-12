import {auctionDatesAPI} from './API';

export const fetchAuctionDates = async (): Promise<Date[]> => {
    const response = await auctionDatesAPI();
    console.log("Response from /dates:", response.data);
    return response.data.map((isoDate) => new Date(isoDate));
};