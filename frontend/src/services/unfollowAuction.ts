import {unfollowAuctionAPI} from './API';

export const unfollowAuction = async (id: string): Promise<void> => {
    await unfollowAuctionAPI(id);
};
