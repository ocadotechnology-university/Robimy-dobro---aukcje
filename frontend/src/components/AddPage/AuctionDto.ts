export interface AuctionDto {
    wantsToBeModerator: boolean,
    title?: string,
    description?: string,
    fileId?: string,
    auctionDate?: string,
    city?: string,
    startingPrice?: number
}