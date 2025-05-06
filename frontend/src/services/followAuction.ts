import {followAuctionAPI} from './API';
import {UUID} from "node:crypto";

export const followAuction = async (id: UUID): Promise<void> => {
    await followAuctionAPI(id);
};
