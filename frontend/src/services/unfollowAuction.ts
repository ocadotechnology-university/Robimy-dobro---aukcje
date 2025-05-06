import {unfollowAuctionAPI} from './API';
import {UUID} from "node:crypto";

export const unfollowAuction = async (id: UUID): Promise<void> => {
    await unfollowAuctionAPI(id);
};
