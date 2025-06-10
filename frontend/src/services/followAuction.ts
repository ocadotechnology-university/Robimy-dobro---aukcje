import {followAuctionAPI} from './API';

export const followAuction = async (id: string): Promise<void> => {
    await followAuctionAPI(id);
};
