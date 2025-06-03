import {UUID} from "node:crypto";

export interface Auction {
    id: UUID,
    publicId: string,
    title: string,
    date: string,
    city: string,
    description: string,
    status: string,
    hasBids: boolean,
    supplierEmail: string;
    supplier: string,
    winner: string,
    price: string,
    fileId: string,
    isFollowed: boolean,
    slackUrl: string,
    wantsToBeModerator: boolean,
    auctions?: Auction[]
}

