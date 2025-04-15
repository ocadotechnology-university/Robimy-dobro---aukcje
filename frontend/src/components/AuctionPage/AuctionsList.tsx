import Stack from '@mui/material/Stack';
import AuctionCard from './AuctionCard/AuctionCard';
import React from "react";
import {Auction} from '../AuctionPage/Auction'

interface AuctionsList {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsList) => {

    const testAuctions = [
        {
            title: "Aukcja 1",
            date: "2025-04-09",
            city: "Warszawa",
            description: "Opis aukcji 1",
            status: "active",
            supplier: "Dostawca 1",
            winner: "Zwycięzca 1",
            price: "1000 PLN",
            imageUrl: "http://example.com/image1.jpg",
            isFollowed: false,
            slackUrl: "http://slack.com/auction1"
        },
        {
            title: "Aukcja 2",
            date: "2025-04-10",
            city: "Kraków",
            description: "Opis aukcji 2",
            status: "inactive",
            supplier: "Dostawca 2",
            winner: "Zwycięzca 2",
            price: "2000 PLN",
            imageUrl: "http://example.com/image2.jpg",
            isFollowed: true,
            slackUrl: "http://slack.com/auction2"
        }
    ];

    auctions = testAuctions;

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