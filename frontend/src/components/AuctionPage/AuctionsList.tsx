import Stack from '@mui/material/Stack';
import AuctionCard from './AuctionCard/AuctionCard';
import React from "react";
import {Auction} from './Auction'

interface AuctionsList {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsList) => {

    const testAuctions = [
        {
            title: "Aukcja 1",
            date: "2025-04-09",
            city: "",
            description: "Opis aukcji 1",
            status: "IN_PROGRESS",
            hasBids: false,
            supplier: "Dostawca 1",
            winner: "Zwycięzca 1",
            price: "1000",
            imageUrl: "https://picsum.photos/200?random=1",
            isFollowed: false,
            slackUrl: "http://slack.com/auction1"
        },
        {
            title: "Aukcja 2",
            date: "",
            city: "Kraków",
            description: "Opis aukcji 2",
            status: "NOT_STARTED",
            hasBids: false,
            supplier: "Dostawca 2",
            winner: "Zwycięzca 2",
            price: "2000",
            imageUrl: "https://picsum.photos/200?random=2",
            isFollowed: true,
            slackUrl: "http://slack.com/auction2"
        }
    ];

    // auctions = testAuctions;

    return (
        <Stack width="100%" gap={1}>
            {auctions.map((auction) => (
                <AuctionCard
                    key={auction.title}
                    title={auction.title}
                    date={auction.date}
                    city={auction.city}
                    description={auction.description}
                    status={auction.status}
                    hasBids={auction.hasBids}
                    supplier={auction.supplier}
                    winner={auction.winner}
                    price={auction.price}
                    imageUrl={auction.imageUrl}
                    isFollowed={auction.isFollowed}
                    slackUrl={auction.slackUrl}
                />
            ))}
        </Stack>
    );
}

export default AuctionsList;