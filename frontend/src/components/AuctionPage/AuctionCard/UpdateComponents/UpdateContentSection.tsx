import React, {useEffect, useRef, useState} from "react";
import {Stack, Box, Grid2} from "@mui/material";
import UpdateAuctionHeader from "./UpdateAuctionHeader";
import UpdateAuctionDescription from "./UpdateAuctionDescription";
// import AuctionFooter from "./AuctionFooter";
import {UUID} from "node:crypto";
import {transformDateFormatToFormDate} from "../../../AddPage/Services/DateTransformer";
import {RichTextEditorRef} from "mui-tiptap";

type Props = {
    id: UUID;
    title: string;
    date: string;
    city: string | null;
    description: string;
    price: string;
};

const UpdateContentSection = ({
                            id,
                            title,
                            date,
                            city,
                            description,
                            price
                        }: Props) => {

    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDate, setUpdatedDate] = useState(date);
    const [updatedCity, setUpdatedCity] = useState(city);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedPrice, setUpdatedPrice] = useState(price);
    const transformedDate = transformDateFormatToFormDate(updatedDate);
    const descriptionRteRef = useRef<RichTextEditorRef>(null);

    // useEffect(() => {
    //     if (descriptionRteRef.current?.editor) {
    //         setUpdatedDescription(descriptionRteRef.current?.editor?.getHTML() ?? "");
    //     }
    // }, [descriptionRteRef.current?.editor]);

    return (
        <Grid2 size={{xs: 12, md: 9}}>
            <Stack spacing={1} height="100%" position="relative">
                <UpdateAuctionHeader title={updatedTitle} setTitle={setUpdatedTitle} date={transformedDate} setDate={setUpdatedDate} city={updatedCity} setCity={setUpdatedCity} price={updatedPrice} setPrice={setUpdatedPrice}/>
                <UpdateAuctionDescription description={updatedDescription} descriptionRteRef={descriptionRteRef}/>
                <Box flexGrow={1}/>
                {/*<AuctionFooter id={id} status={status} supplier={supplier} winner={winner} isFollowed={isFollowed}*/}
                {/*               slackUrl={slackUrl} setIsUpdating={setIsUpdating}/>*/}
            </Stack>
        </Grid2>
    );
};

export default UpdateContentSection;
