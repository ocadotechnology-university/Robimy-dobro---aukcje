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
                    />
                </div>
            ))}

            {oneIsUpdating && (
                <Dialog
                    open={openDialog}
                    onClose={handleCloseDialog}
                >
                    <DialogTitle
                        id="alert-dialog-title">{"Czy na pewno chcesz rozpocząć edycję tej aukcji?"}</DialogTitle>
                    <DialogContent>
                        <Typography>
                            Jesteś w trakcie edycji innej aukcji. Czy chcesz do niej powrócić, czy porzucić wprowadzone
                            zmiany i rozpocząć edycję nowej aukcji?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Stack width="100%" direction="row" justifyContent="space-between" spacing={3}>
                            <Button onClick={handleCloseDialog} color="primary">
                                Anuluj
                            </Button>
                            <Button onClick={handleBackToPreviousUpdatingAuction} color="primary">
                                Przenieś do edytowanej
                            </Button>
                            <Button onClick={handleNewUpdate} color="primary" autoFocus>
                                Edytuj nową
                            </Button>
                        </Stack>
                    </DialogActions>
                </Dialog>
            )}

        </Stack>
    );
};

export default AuctionsList;