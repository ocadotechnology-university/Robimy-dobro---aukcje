import React from "react";
import Stack from '@mui/material/Stack';
import {UUID} from "node:crypto";
import AuctionCard from './AuctionCard/AuctionCard';
import {Auction} from './Auction'

interface AuctionsList {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsList) => {

    const testAuctions: Auction[] = [
        {
            id: "befa7825-5863-4872-abd9-e607ca35b997",
            title: "Aukcja 1",
            date: "2025-04-09",
            city: "",
            description: "Opis aukcji 1",
            status: "IN_PROGRESS",
            hasBids: false,
            supplier: "Dostawca 1",
            winner: "Zwycięzca 1",
            price: "1000",
            fileId: "https://picsum.photos/200?random=1",
            isFollowed: false,
            slackUrl: "http://slack.com/auction1"
        },
        {
            id: "5f3ceb8e-3707-4a57-a1b2-fa5674e7b38c",
            title: "Aukcja 2",
            date: "",
            city: "Kraków",
            description: "Opis aukcji 2",
            status: "NOT_STARTED",
            hasBids: false,
            supplier: "Dostawca 2",
            winner: "Zwycięzca 2",
            price: "2000",
            fileId: "https://picsum.photos/200?random=2",
            isFollowed: true,
            slackUrl: "http://slack.com/auction2"
        }
    ];

    auctions = testAuctions;

    return (
        <Stack width="100%" gap={1}>
            {auctions.map((auction) => (
                <AuctionCard
                    {...auction}
                />
            ))}
        </Stack>
    );
}

export default AuctionsList;