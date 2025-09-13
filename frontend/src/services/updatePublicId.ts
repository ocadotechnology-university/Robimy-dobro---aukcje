import {auctionUpdatePublicIdAPI} from './API';

interface UpdatePublicIdParams {
    auctionId: string;
    publicId: number | null;
};

export const updatePublicId = async ({auctionId, publicId}: UpdatePublicIdParams): Promise<void> => {
    await auctionUpdatePublicIdAPI(auctionId, publicId);
};