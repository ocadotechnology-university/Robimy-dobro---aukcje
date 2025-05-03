export interface AddAuction {
    wantsToBeModerator: boolean,
    title?: string,
    description?: string,
    fileId?: string,
    AuctionDate?: string,
    city?: string,
    startingPrice?: number
}