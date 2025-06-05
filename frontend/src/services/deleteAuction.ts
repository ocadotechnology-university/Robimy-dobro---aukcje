import {UUID} from "node:crypto";
import {deleteAuctionAPI} from "./API";

export const deleteAuction = async (id: UUID) => {
    await deleteAuctionAPI(id);
};