import React, {useEffect, useRef, useState} from "react";
import {Stack, Box, Grid2} from "@mui/material";
import UpdateAuctionHeader from "./UpdateAuctionHeader";
import UpdateAuctionDescription from "./UpdateAuctionDescription";
// import AuctionFooter from "./AuctionFooter";
import {UUID} from "node:crypto";
import {transformDateFormatToFormDate} from "../../../AddPage/Services/DateTransformer";
import {RichTextEditorRef} from "mui-tiptap";
import Button from "@mui/material/Button";

type Props = {
    id: UUID;
    title: string;
    setTitle: (value: string) => void;
    date: string;
    setDate: (value: string) => void;
    city: string | null;
    setCity: (value: string | null) => void;
    description: string;
    price: string;
    setPrice: (value: string) => void;
    descriptionRteRef: React.RefObject<RichTextEditorRef | null>;
};

const UpdateContentSection = ({
                            id,
                            title, setTitle,
                            date, setDate,
                            city, setCity,
                            description, descriptionRteRef,
                            price, setPrice,
                        }: Props) => {

    // useEffect(() => {
    //     if (descriptionRteRef.current?.editor) {
    //         setUpdatedDescription(descriptionRteRef.current?.editor?.getHTML() ?? "");
    //     }
    // }, [descriptionRteRef.current?.editor]);

    return (
        <Grid2 size={{xs: 12, md: 9}}>
            <Stack spacing={3} height="100%" position="relative">
                <UpdateAuctionHeader title={title} setTitle={setTitle} date={date} setDate={setDate} city={city} setCity={setCity} price={price} setPrice={setPrice}/>
                <UpdateAuctionDescription description={description} descriptionRteRef={descriptionRteRef}/>
                {/*<AuctionFooter id={id} status={status} supplier={supplier} winner={winner} isFollowed={isFollowed}*/}
                {/*               slackUrl={slackUrl} setIsUpdating={setIsUpdating}/>*/}
                <Button>Zapisz</Button>
            </Stack>
        </Grid2>
    );
};

export default UpdateContentSection;
