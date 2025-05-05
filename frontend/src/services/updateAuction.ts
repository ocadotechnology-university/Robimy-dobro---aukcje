import { AddAuction } from '../components/AddPage/AddAuction';
import { auctionUpdateAPI } from './API';

interface UpdateAuctionParams {
    auctionId: string;
    updateAuction: AddAuction;
};

export const updateAuction = async ({auctionId, updateAuction}: UpdateAuctionParams): Promise<void> => {
    await auctionUpdateAPI(auctionId, updateAuction);
};