import React from "react";
import {Stack, Box, Grid2} from "@mui/material";
import AuctionHeader from "./AuctionHeader";
import AuctionDescription from "./AuctionDescription";
import AuctionFooter from "./AuctionFooter";

type Props = {
    title: string;
    date: string;
    city: string | null;
    description: string;
    status: string;
    hasBids: boolean;
    supplier: string;
    winner: string;
    price: string;
    isFollowed: boolean;
    slackUrl: string;
};

const ContentSection = ({
                            title,
                            date,
                            city,
                            description,
                            status,
                            hasBids,
                            supplier,
                            winner,
                            price,
                            isFollowed,
                            slackUrl
                        }: Props) => (
    <Grid2 size={{xs: 12, md: 9}}>
        <Stack spacing={1} height="100%" position="relative">
            <AuctionHeader title={title} date={date} city={city} price={price} status={status} hasBids={hasBids}/>
            <AuctionDescription description={description}/>
            <Box flexGrow={1}/>
            <AuctionFooter status={status} supplier={supplier} winner={winner} isFollowed={isFollowed}
                           slackUrl={slackUrl}/>
        </Stack>
    </Grid2>
);

export default ContentSection;
