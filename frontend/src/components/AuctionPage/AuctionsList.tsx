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