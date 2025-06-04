import { auctionUpdatePublicIdAPI } from './API';

interface UpdatePublicIdParams {
    auctionId: string;
    publicId: number | null;
};

export const updatePublicId = async ({auctionId, publicId}: UpdatePublicIdParams): Promise<void> => {
    console.log('updatePublicId', publicId);
    await auctionUpdatePublicIdAPI(auctionId, publicId);
};