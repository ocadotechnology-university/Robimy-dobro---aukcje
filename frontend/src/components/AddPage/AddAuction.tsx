export interface AddAuction {
    wantsToBeModerator: boolean,
    title?: string,
    description?: string,
    fileId?: string,
    preferredAuctionDate?: string,
    city?: string,
    startingPrice?: string
}