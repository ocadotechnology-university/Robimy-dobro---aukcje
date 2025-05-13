import React, {useState} from "react";
import {Card, Grid2} from "@mui/material";
import {CardStyle} from "./AuctionCard.styles";
import ImageSection from "./ImageSection";
import ContentSection from "./ContentSection";
import UpdateContentSection from "./UpdateComponents/UpdateContentSection";
import {UUID} from "node:crypto";

type Props = {
    id: UUID;
    title: string;
    date: string;
    city: string | null;
    description: string;
    status: string;
    hasBids: boolean;
    supplier: string;
    winner: string;
    price: string;
    fileId: string;
    isFollowed: boolean;
    slackUrl: string;
};

const AuctionCard = (props: Props) => {
    const [isUpdating, setIsUpdating] = useState(false);

    return (
        <Card variant="outlined" sx={CardStyle}>
            {!isUpdating ? (
                <Grid2 container spacing={2}>
                    <ImageSection fileId={props.fileId}/>
                    <ContentSection {...props} setIsUpdating={setIsUpdating} />
                </Grid2>
            ) : (
                <Grid2 container spacing={2}>
                    <ImageSection fileId={props.fileId}/>
                    <UpdateContentSection {...props} />
                </Grid2>
            )
            }

        </Card>
    );
};

export default AuctionCard;