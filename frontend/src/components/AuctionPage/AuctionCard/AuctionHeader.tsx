import React, {useState} from "react";
import {Box, Stack, TextField, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getPriceLabel} from "./helpers";
import {transformDateFormatToFormDate} from "../../AddPage/Services/DateTransformer";

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
};

const AuctionHeader = ({publicId, title, date, city, price, status, hasBids, setNewPublicId, handleUpdatePublicId}: Props) => {
    const priceLabel = getPriceLabel(status, hasBids);
    const [publicIdIsUpdating, setPublicIdIsUpdating] = useState(false);
    // const [newPublicId, setNewPublicId] = useState(publicId);


    const handlePublicIdEdit = () => {
        setPublicIdIsUpdating(true);
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            setPublicIdIsUpdating(false);
            handleUpdatePublicId();
        }
    };

    return (
        <Stack justifyContent="space-between" direction="row" alignItems="flex-start" sx={{width: "100%"}}>
            <Box>
                <Typography variant="h6" fontWeight="bold">
                    {!publicIdIsUpdating ? (
                        <Box onClick={handlePublicIdEdit} component="span" color="text.secondary" mr={1} sx={{cursor:"pointer"}}>#{publicId}</Box>
                    ) : (
                        <TextField label="ID" defaultValue={publicId}
                                   onChange={(e) => setNewPublicId(e.target.value)}
                                   onKeyDown={handleKeyPress}
                                   sx={{width: "15%", marginBottom: 2, marginRight: 2}} />
                    )}
                    {title}</Typography>
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
                <Typography variant="body2" fontWeight="bold">
                    {priceLabel}
                </Typography>
                <Typography fontWeight="bold" fontSize="1.7rem">
                    {price} PLN
                </Typography>
            </Box>
        </Stack>
    );
};

export default AuctionHeader;
