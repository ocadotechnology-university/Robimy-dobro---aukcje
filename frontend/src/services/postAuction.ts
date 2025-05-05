import { AuctionDto } from '../components/AddPage/AuctionDto';
import { auctionPostAPI } from './API';

export const postAuction = async (newAuction: AuctionDto): Promise<void> => {
    await auctionPostAPI(newAuction);
};