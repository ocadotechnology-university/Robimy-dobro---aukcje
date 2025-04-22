import React from "react";
import {Card, Grid2} from "@mui/material";
import {CardStyle} from "./AuctionCard.styles";
import ImageSection from "./ImageSection";
import ContentSection from "./ContentSection";

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
    imageUrl: string;
    isFollowed: boolean;
    slackUrl: string;
};

const AuctionCard = (props: Props) => (
    <Card variant="outlined" sx={CardStyle}>
        <Grid2 container spacing={2}>
            <ImageSection imageUrl={props.imageUrl}/>
            <ContentSection {...props} />
        </Grid2>
    </Card>
);

export default AuctionCard;
