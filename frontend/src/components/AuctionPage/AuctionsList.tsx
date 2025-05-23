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
        if(id) {
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

    // const testAuctions: Auction[] = [
    //     {
    //         id: "befa7825-5863-4872-abd9-e607ca35b997",
    //         publicId: "1",
    //         title: "Aukcja 1",
    //         date: "2025-11-23",
    //         city: "",
    //         description: "<p>Opis aukcji 1</p>",
    //         status: "IN_PROGRESS",
    //         hasBids: false,
    //         supplier: "Dostawca 1",
    //         winner: "Zwycięzca 1",
    //         price: "1000",
    //         fileId: "https://picsum.photos/200?random=1",
    //         isFollowed: false,
    //         slackUrl: "http://slack.com/auction1"
    //     },
    //     {
    //         id: "5f3ceb8e-3707-4a57-a1b2-fa5674e7b38c",
    //         publicId: "2",
    //         title: "Aukcja 2",
    //         date: "",
    //         city: "Kraków",
    //         description: "<p><b>Opis</b> aukcji 1</p>",
    //         status: "NOT_STARTED",
    //         hasBids: false,
    //         supplier: "Dostawca 2",
    //         winner: "Zwycięzca 2",
    //         price: "2000",
    //         fileId: "https://picsum.photos/200?random=2",
    //         isFollowed: true,
    //         slackUrl: "http://slack.com/auction2"
    //     }
    // ];

    // auctions = testAuctions;
    return (
        <Stack width="100%" gap={1}>
            {auctions.map((auction) => (

                <div
                    key={auction.id}
                    ref={(el) => {auctionRefs.current[auction.id] = el}}
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
                            Jesteś w trakcie edycji innej auckji. Czy chcesz porzucić wprowadzone zmiany i rozpocząć
                            edycję nowej aukcji?
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseDialog} color="primary">
                            Anuluj
                        </Button>
                        <Button onClick={handleBackToPreviousUpdatingAuction} color="primary">
                            Anuluj i przenieś do rozpoczętej edycji
                        </Button>
                        <Button onClick={handleNewUpdate} color="primary" autoFocus>
                            Rozpocznij nową edycję
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

        </Stack>
    );
};

export default AuctionsList;