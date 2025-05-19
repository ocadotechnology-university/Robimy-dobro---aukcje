import React, {useState} from "react";
import Stack from '@mui/material/Stack';
import {UUID} from "node:crypto";
import AuctionCard from './AuctionCard/AuctionCard';
import {Auction} from './Auction'

interface AuctionsListProps {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsListProps) => {
    const [editingAuctionId, setEditingAuctionId] = useState<UUID | null>(null);

    const testAuctions: Auction[] = [
        {
            id: "befa7825-5863-4872-abd9-e607ca35b997",
            publicId: "1",
            title: "Aukcja 1",
            date: "2025-11-23",
            city: "",
            description: "<p>Opis aukcji 1</p>",
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
            publicId: "2",
            title: "Aukcja 2",
            date: "",
            city: "Kraków",
            description: "<p><b>Opis</b> aukcji 1</p>",
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

    // auctions = testAuctions;
    return (
        <Stack width="100%" gap={1}>
            {auctions.map((auction) => (
                <AuctionCard
                    {...auction} isUpdating={editingAuctionId === auction.id} setEditingAuctionId={setEditingAuctionId}
                />
            ))}
        </Stack>
    );
};

export default AuctionsList;