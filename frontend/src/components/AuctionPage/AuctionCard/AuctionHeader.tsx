import React, {useState} from "react";
import {Alert, Box, Snackbar, Stack, TextField, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getPriceLabel} from "./helpers";
import {transformDateFormatToFormDate} from "../../AddPage/Services/DateTransformer";
import {useAuth} from "../../../hooks/AuthProvider";
import {useViewMode} from "../../../contexts/ViewModeContext";
import ExpandTitle from "./ExpandTitle";

type Props = {
    publicId: string;
    title: string;
    date: string;
    city: string | null;
    price: string;
    status: string;
    hasBids: boolean;
    setNewPublicId: (value: string) => void;
    handleUpdatePublicId: () => void;
    publicIdList: string[];
};

const AuctionHeader = ({
                           publicId,
                           title,
                           date,
                           city,
                           price,
                           status,
                           hasBids,
                           setNewPublicId,
                           handleUpdatePublicId,
                           publicIdList
                       }: Props) => {
    const priceLabel = getPriceLabel(status, hasBids);
    const [publicIdIsUpdating, setPublicIdIsUpdating] = useState(false);
    const stringPublicId = publicId != null ? publicId.toString() : "";
    const [newCheckPublicId, setNewCheckPublicId] = useState(stringPublicId);
    const {role} = useAuth();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const {adminViewMode} = useViewMode();
    const canEditPublicId = role === "ADMIN" && adminViewMode

    const handlePublicIdEdit = () => {
        if (canEditPublicId) {
            setPublicIdIsUpdating(true);
        }
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            if (newCheckPublicId === stringPublicId) {
                setPublicIdIsUpdating(false);
                return;
            }

            if (!publicIdList.includes(newCheckPublicId)) {
                setPublicIdIsUpdating(false);
                handleUpdatePublicId();
            } else {
                setSnackbarOpen(true);
            }
        }

        if (e.key === 'Escape') {
            setPublicIdIsUpdating(false);
        }
    };

    return (
        <Stack justifyContent="space-between" direction="row" alignItems="flex-start" gap={3} sx={{width: "100%"}}>
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    {!publicIdIsUpdating ? (
                        <Box onClick={handlePublicIdEdit} component="span" color="text.secondary" mr={1}
                             sx={{cursor: canEditPublicId ? "pointer" : "default"}}>#{publicId}</Box>
                    ) : (
                        <TextField label="ID" defaultValue={publicId} type="Number"
                                   onChange={(e) => {setNewCheckPublicId(e.target.value)
                                                                                        setNewPublicId(e.target.value)}}
                                   onKeyDown={handleKeyPress}
                                   sx={{width: "100px", marginBottom: 2, marginRight: 2}}/>
                    )}
                    <ExpandTitle text={title} maxLength={39}/>
                    </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                        <CalendarTodayIcon fontSize="small"/>
                        <b>{date || '-'}</b>
                    </Typography>
                    {city && (
                        <>
                            <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                <LocationOnIcon fontSize="small"/>
                                Odbiór tylko w: <b>{city}</b>
                            </Typography>
                        </>
                    )}
                </Stack>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="body2" fontWeight="bold" sx={{whiteSpace: "nowrap"}}>
                    {priceLabel}
                </Typography>
                <Typography fontWeight="bold" fontSize="1.7rem" sx={{whiteSpace: "nowrap"}}>
                    {price} PLN
                </Typography>
            </Box>

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={4000}
                key="top-center"
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={"warning"}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    Podane ID już istnieje
                </Alert>
            </Snackbar>
        </Stack>
    );
};

export default AuctionHeader;
