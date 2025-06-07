import React, {useRef, useState} from "react";
import Stack from '@mui/material/Stack';
import {UUID} from "node:crypto";
import AuctionCard from './AuctionCard/AuctionCard';
import {Auction} from './Auction'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from "@mui/material";
import Typography from "@mui/material/Typography";

interface AuctionsListProps {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsListProps) => {
    const [editingAuctionId, setEditingAuctionId] = useState<UUID | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [oneIsUpdating, setOneIsUpdating] = useState(false);
    const [newUpdatingAuction, setNewUpdatingAuction] = useState(false);
    const [backupEditingAuctionId, setBackupEditingAuctionId] = useState<UUID | null>(null);

    const auctionRefs = useRef<Record<UUID, HTMLDivElement | null>>({});

    const publicIdList = auctions.map((auction) => (auction.publicId != null ? auction.publicId.toString() : ""));

    const scrollToAuction = (id: UUID | null) => {
        if (id) {
            auctionRefs.current[id]?.scrollIntoView({behavior: "smooth", block: "center"});
            setOpenDialog(false);
        }
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNewUpdate = () => {
        setEditingAuctionId(backupEditingAuctionId);
        setOneIsUpdating(true);
        setOpenDialog(false);

        setNewUpdatingAuction(true);
    };

    const handleBackToPreviousUpdatingAuction = () => {
        scrollToAuction(editingAuctionId);
    }
    return (
        <Stack width="100%" gap={1}>
            {auctions.map((auction) => (
                <div
                    key={auction.id}
                    ref={(el) => {
                        auctionRefs.current[auction.id] = el
                    }}
                >
                    <AuctionCard
                        {...auction} isUpdating={editingAuctionId === auction.id} editingAuctionId={editingAuctionId}
                        setEditingAuctionId={setEditingAuctionId} setOpenDialog={setOpenDialog}
                        setOneIsUpdating={setOneIsUpdating} newUpdatingAuction={newUpdatingAuction}
                        setNewUpdatingAuction={setNewUpdatingAuction}
                        setBackupEditingAuctionId={setBackupEditingAuctionId}
                        publicIdList={publicIdList}
                    />
                </div>
            ))}

            {oneIsUpdating && (
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Trwa edycja innej aukcji"}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Czy chcesz wrócić do wcześniej edytowanej aukcji?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Stack width="100%" direction="row" justifyContent="space-between" spacing={3}>
                            <Button onClick={handleBackToPreviousUpdatingAuction} color="primary">
                                Tak, wróć do edytowanej
                            </Button>
                            <Button onClick={handleNewUpdate} color="primary" autoFocus>
                                Nie, edytuj nową
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            )}

        </Stack>
    );
};

export default AuctionsList;