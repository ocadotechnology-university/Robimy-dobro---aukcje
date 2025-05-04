import { AddAuction } from '../components/AddPage/AddAuction';
import { auctionPostAPI } from './API';

export const postAuction = async (newAuction: AddAuction): Promise<void> => {
    await auctionPostAPI(newAuction);
};