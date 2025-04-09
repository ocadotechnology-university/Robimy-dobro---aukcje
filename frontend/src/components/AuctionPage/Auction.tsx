// @ts-ignore
export interface Auction {
    title: string,
    date: string,
    city: string,
    description: string,
    status: string,
    supplier: string,
    winner: string,
    price: string,
    imageUrl: string,
    isFollowed: boolean,
    slackUrl: string,
    auctions?: Auction[]
}

