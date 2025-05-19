import React, {useEffect, useRef, useState} from "react";
import {Stack, Box, Grid2} from "@mui/material";
import UpdateAuctionHeader from "./UpdateAuctionHeader";
import UpdateAuctionDescription from "./UpdateAuctionDescription";
import {UUID} from "node:crypto";
import {RichTextEditorRef} from "mui-tiptap";
import {UpdateActionButtonSave, UpdateActionButtonCancel} from "../../../common/UpdateActionButtons";

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
    handleUpdate: () => void;
    handleCancellation: () => void;
};

const UpdateContentSection = ({
                            id,
                            title, setTitle,
                            date, setDate,
                            city, setCity,
                            description, descriptionRteRef,
                            price, setPrice,
                            handleUpdate, handleCancellation
                        }: Props) => {

    return (
        <Grid2 size={{xs: 12, md:7.5, lg: 8.3}}>
            <Stack spacing={3} height="100%" position="relative" marginLeft={1}>
                <UpdateAuctionHeader title={title} setTitle={setTitle} date={date} setDate={setDate} city={city} setCity={setCity} price={price} setPrice={setPrice}/>
                <UpdateAuctionDescription description={description} descriptionRteRef={descriptionRteRef}/>
                <Stack direction="row" width="100%" alignItems={"center"} justifyContent="space-between">
                    <UpdateActionButtonCancel
                        label="Anuluj"
                        onClick={handleCancellation}
                    />
                    <UpdateActionButtonSave
                        label="Zapisz"
                        onClick={handleUpdate}
                    />
                </Stack>
            </Stack>
        </Grid2>
    );
};

export default UpdateContentSection;
