import { AddAuction } from '../components/AddPage/AddAuction';
import { auctionUpdateAPI } from './API';
import {UUID} from "node:crypto";

interface UpdateAuctionParams {
    auctionId: UUID;
    updateAuction: AddAuction;
};

export const updateAuction = async ({auctionId, updateAuction}: UpdateAuctionParams): Promise<void> => {
    await auctionUpdateAPI(auctionId, updateAuction);
};