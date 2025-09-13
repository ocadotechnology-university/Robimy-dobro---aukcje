import {AuctionDto} from '../components/AddPage/AuctionDto';
import {auctionUpdateAPI} from './API';

interface UpdateAuctionParams {
    auctionId: string;
    updateAuction: AuctionDto;
};

export const updateAuction = async ({auctionId, updateAuction}: UpdateAuctionParams): Promise<void> => {
    await auctionUpdateAPI(auctionId, updateAuction);
};