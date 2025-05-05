// @ts-ignore
export interface Auction {
    id: string,
    title: string,
    date: string,
    city: string,
    description: string,
    status: string,
    hasBids: boolean,
    supplier: string,
    winner: string,
    price: string,
    fileId: string,
    isFollowed: boolean,
    slackUrl: string,
    auctions?: Auction[]
}

