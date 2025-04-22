import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import {getPriceLabel} from "./helpers";

type Props = {
    title: string;
    date: string;
    city: string | null;
    price: string;
    status: string;
    hasBids: boolean;
};

const AuctionHeader = ({title, date, city, price, status, hasBids}: Props) => {
    const priceLabel = getPriceLabel(status, hasBids);

    return (
        <Stack justifyContent="space-between" direction="row" alignItems="flex-start" sx={{width: "100%"}}>
            <Box>
                <Typography variant="h6" fontWeight="bold">{title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon fontSize="small"/>
                    <Typography variant="body2"><b>{date}</b></Typography>
                    {city && (
                        <>
                            <Typography variant="body2" display="flex" alignItems="center" gap={0.5}>
                                <LocationOnIcon fontSize="small" />
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
