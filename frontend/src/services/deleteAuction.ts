import {deleteAuctionAPI} from "./API";

export const deleteAuction = async (id: string) => {
    await deleteAuctionAPI(id);
};