import React, {useEffect, useState} from "react";
import {Box, IconButton} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {SiSlack} from "react-icons/si";
import AuctionStatus from "./AuctionStatus";
import {AuctionCardFooterGrid, IconBox} from "./AuctionCard.styles";
import {useFollowAuction} from "../../../hooks/useFollowAuction";
import {useUnfollowAuction} from "../../../hooks/useUnfollowAuction";
import {useDebounce} from "../../../hooks/useDebounce";
import {useAuth} from "../../../hooks/AuthProvider";
import {useViewMode} from "../../../contexts/ViewModeContext";

const SlackIcon = SiSlack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

type Props = {
    id: string;
    status: string;
    supplierEmail: string;
    supplier: string;
    winner: string;
    isFollowed: boolean;
    slackUrl: string;
    editingAuctionId: string | null;
    setEditingAuctionId: (value: string | null) => void;
    setOpenDialog: (value: boolean) => void;
    setOneIsUpdating: (value: boolean) => void;
    newUpdatingAuction: boolean;
    setNewUpdatingAuction: (value: boolean) => void;
    setBackupEditingAuctionId: (value: string | null) => void;
    onDeleteClick: (id: string) => void;
};

const AuctionFooter = ({
                           status,
                           supplierEmail,
                           supplier,
                           winner,
                           isFollowed,
                           slackUrl,
                           id,
                           setEditingAuctionId,
                           setOpenDialog,
                           setOneIsUpdating,
                           editingAuctionId,
                           newUpdatingAuction,
                           setNewUpdatingAuction,
                           setBackupEditingAuctionId,
                           onDeleteClick,
                       }: Props) => {
    const [followed, setFollowed] = useState(isFollowed);
    const debouncedFollowed = useDebounce(followed, 300);

    const {mutate: followAuction} = useFollowAuction();
    const {mutate: unfollowAuction} = useUnfollowAuction();

    const {role, supplier: currentUserEmail} = useAuth();
    const {adminViewMode} = useViewMode();
    const canEditOrDelete = role === "ADMIN" && adminViewMode || (supplierEmail === currentUserEmail && status === "NOT_STARTED");

    useEffect(() => {
        if (debouncedFollowed !== isFollowed) {
            const action = debouncedFollowed ? followAuction : unfollowAuction;
            action(id, {
                onError: () => {
                    setFollowed(!debouncedFollowed);
                }
            });
        }
    }, [debouncedFollowed]);

    const handleUpdate = () => {
        if (!editingAuctionId) {
            setEditingAuctionId(id);
            setOneIsUpdating(true);
        } else {
            setBackupEditingAuctionId(id);
            setOpenDialog(true);
        }
    };

    const handleDelete = () => {
        onDeleteClick(id);
    };

    return (
        <AuctionCardFooterGrid container spacing={2}>
            <AuctionStatus status={status} supplier={supplier} winner={winner}/>
            <Box display="flex" flexDirection="row" alignItems="flex-end" gap={1} paddingBottom={1}>
                <SlackIcon
                    onClick={() => window.open(slackUrl, "_blank", "noopener,noreferrer")}
                    style={{fontSize: "28px", cursor: "pointer", margin: "5px"}}
                />
                <Box onClick={() => setFollowed((prev) => !prev)}
                     sx={{cursor: "pointer", display: "flex", alignItems: "center"}}>
                    {followed ? (
                        <FavoriteIcon fontSize="large" color="secondary"/>
                    ) : (
                        <FavoriteBorderIcon fontSize="large" color="secondary"/>
                    )}
                </Box>
                {canEditOrDelete && (
                    <>
                        <IconBox>
                            <IconButton size="small">
                                <EditIcon onClick={handleUpdate}/>
                            </IconButton>
                        </IconBox>
                        <IconBox>
                            <IconButton size="small">
                                <DeleteIcon onClick={handleDelete}/>
                            </IconButton>
                        </IconBox>
                    </>
                )}
            </Box>
        </AuctionCardFooterGrid>
    );
};

export default AuctionFooter;