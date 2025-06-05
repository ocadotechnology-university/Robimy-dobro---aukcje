import React, {useRef, useState} from "react";
import Stack from '@mui/material/Stack';
import {UUID} from "node:crypto";
import AuctionCard from './AuctionCard/AuctionCard';
import {Auction} from './Auction'
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Snackbar, Alert} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useDeleteAuction} from "../../hooks/useDeleteAuction";

interface AuctionsListProps {
    auctions: Auction[];
}

const AuctionsList = ({auctions}: AuctionsListProps) => {
    const [editingAuctionId, setEditingAuctionId] = useState<UUID | null>(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [oneIsUpdating, setOneIsUpdating] = useState(false);
    const [newUpdatingAuction, setNewUpdatingAuction] = useState(false);
    const [backupEditingAuctionId, setBackupEditingAuctionId] = useState<UUID | null>(null);
    const [deletingAuctionId, setDeletingAuctionId] = useState<UUID | null>(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const deleteAuction = useDeleteAuction();
    const [isDeletingAuctionId, setIsDeletingAuctionId] = useState<UUID | null>(null);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

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

    const handleDeleteClick = (auctionId: UUID) => {
        setDeletingAuctionId(auctionId);
        setOpenDeleteDialog(true);
    };

    const handleCancelDelete = () => {
        setOpenDeleteDialog(false);
        setDeletingAuctionId(null);
    };

    const handleConfirmDelete = () => {
        if (deletingAuctionId) {
            setIsDeletingAuctionId(deletingAuctionId);
            deleteAuction.mutate(deletingAuctionId, {
                onSuccess: () => {
                    setSnackbarMessage("Pomyślnie usunięto aukcję");
                    setSnackbarSeverity("success");
                    setSnackbarOpen(true);
                    setOpenDeleteDialog(false);
                    setDeletingAuctionId(null);
                    setIsDeletingAuctionId(null);
                },
                onError: () => {
                    setSnackbarMessage("Błąd podczas usuwania aukcji");
                    setSnackbarSeverity("error");
                    setSnackbarOpen(true);
                    setOpenDeleteDialog(false);
                    setDeletingAuctionId(null);
                    setIsDeletingAuctionId(null);
                }
            });
        }
        setOpenDeleteDialog(false);
        setDeletingAuctionId(null);
    };

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
                        onDeleteClick={handleDeleteClick}
                        isDeleting={isDeletingAuctionId === auction.id}
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

            <Dialog open={openDeleteDialog} onClose={handleCancelDelete}>
                <DialogTitle>Czy na pewno chcesz usunąć aukcję?</DialogTitle>
                <DialogContent>
                    <Typography>
                        Tej operacji nie można cofnąć.
                    </Typography>
                </DialogContent>
                <DialogActions sx={{display: "flex", justifyContent: "space-between", p: 2}}>
                    <Button onClick={handleCancelDelete} sx={{textTransform: "none"}}>
                        Anuluj
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" sx={{textTransform: "none"}} autoFocus>
                        Usuń
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={2000}
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default AuctionsList;