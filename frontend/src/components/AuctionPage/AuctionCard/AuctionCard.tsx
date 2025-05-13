import React, {useRef, useState} from "react";
import {Card, Grid2} from "@mui/material";
import {CardStyle} from "./AuctionCard.styles";
import ImageSection from "./ImageSection";
import UpdateImageSection from "./UpdateComponents/UpdateImageSection";
import ContentSection from "./ContentSection";
import UpdateContentSection from "./UpdateComponents/UpdateContentSection";
import {UUID} from "node:crypto";
import {transformDateFormatToFormDate} from "../../AddPage/Services/DateTransformer";
import {RichTextEditorRef} from "mui-tiptap";

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

    const [updatedTitle, setUpdatedTitle] = useState(props.title);
    const [updatedDate, setUpdatedDate] = useState(props.date);
    const [updatedCity, setUpdatedCity] = useState(props.city);
    const [updatedDescription, setUpdatedDescription] = useState(props.description);
    const [updatedPrice, setUpdatedPrice] = useState(props.price);
    const transformedDate = transformDateFormatToFormDate(updatedDate);
    const descriptionRteRef = useRef<RichTextEditorRef>(null);
    const [updateFileId, setUpdateFileId] = useState(props.fileId);

    return (
        <Card variant="outlined" sx={CardStyle}>
            {!isUpdating ? (
                <Grid2 container spacing={2}>
                    <ImageSection fileId={props.fileId}/>
                    <ContentSection {...props} setIsUpdating={setIsUpdating} />
                </Grid2>
            ) : (
                <Grid2 container spacing={2}>
                    <UpdateImageSection fileId={props.fileId} setFileId={setUpdateFileId}/>
                    <UpdateContentSection id={props.id} title={updatedTitle} setTitle={setUpdatedTitle} date={transformedDate} setDate={setUpdatedDate} city={updatedCity} setCity={setUpdatedCity} description={updatedDescription} descriptionRteRef={descriptionRteRef} price={updatedPrice} setPrice={setUpdatedPrice}/>
                </Grid2>
            )
            }

        </Card>
    );
};

export default AuctionCard;