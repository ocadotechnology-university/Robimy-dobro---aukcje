import React from "react";
import {Stack, Box, Grid2} from "@mui/material";
import AuctionHeader from "./AuctionHeader";
import AuctionDescription from "./AuctionDescription";
import AuctionFooter from "./AuctionFooter";

type Props = {
    id: string;
    publicId: string;
    title: string;
    date: string;
    city: string | null;
    description: string;
    status: string;
    hasBids: boolean;
    supplierEmail: string;
    supplier: string;
    winner: string;
    price: string;
    isFollowed: boolean;
    slackUrl: string;
    editingAuctionId: string | null;
    setEditingAuctionId: (value: string | null) => void;
    onDeleteClick: (id: string) => void;
    setOpenDialog: (value: boolean) => void;
    setOneIsUpdating: (value: boolean) => void;
    newUpdatingAuction: boolean;
    setNewUpdatingAuction: (value: boolean) => void;
    setBackupEditingAuctionId: (value: string | null) => void;
    setNewPublicId: (value: string) => void;
    handleUpdatePublicId: () => void;
    publicIdList: string[];
};

export const ContentSection = ({
                            id,
                            publicId,
                            title,
                            date,
                            city,
                            description,
                            status,
                            hasBids,
                            supplierEmail,
                            supplier,
                            winner,
                            price,
                            isFollowed,
                            slackUrl,
                            editingAuctionId,
                            setEditingAuctionId,
                            setOpenDialog,
                            setOneIsUpdating,
                            newUpdatingAuction,
                            setNewUpdatingAuction,
                            setBackupEditingAuctionId,
                            onDeleteClick,
                            setNewPublicId,
                            handleUpdatePublicId,
                            publicIdList
                        }: Props) => (
    <Grid2 size={{xs: 12, md: 9}}>
        <Stack spacing={1} height="100%" position="relative">
            <AuctionHeader publicId={publicId} title={title} date={date} city={city} price={price} status={status} hasBids={hasBids}
                           setNewPublicId={setNewPublicId} handleUpdatePublicId={handleUpdatePublicId} publicIdList={publicIdList}/>
            <AuctionDescription description={description}/>
            <Box flexGrow={1}/>
            <AuctionFooter id={id} status={status} supplierEmail={supplierEmail} supplier={supplier} winner={winner}
                           isFollowed={isFollowed}
                           slackUrl={slackUrl} setEditingAuctionId={setEditingAuctionId} setOpenDialog={setOpenDialog}
                           setOneIsUpdating={setOneIsUpdating} editingAuctionId={editingAuctionId}
                           newUpdatingAuction={newUpdatingAuction} setNewUpdatingAuction={setNewUpdatingAuction}
                           setBackupEditingAuctionId={setBackupEditingAuctionId}
                           onDeleteClick={onDeleteClick}
            />
        </Stack>
    </Grid2>
);
