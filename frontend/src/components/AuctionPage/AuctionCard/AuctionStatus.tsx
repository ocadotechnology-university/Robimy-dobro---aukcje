import React from "react";
import {Box, Typography} from "@mui/material";
import {getStatusLabel} from "./helpers";

type Props = {
    status: string;
    supplier: string;
    winner: string;
};

const AuctionStatus = ({status, supplier, winner}: Props) => {
    const statusLabel = getStatusLabel(status);
    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1} paddingBottom={1}>
            <Typography variant="body2">
                Status licytacji: <b>{statusLabel}</b><br/>
                Dostawca: <b>{supplier}</b><br/>
                Zwycięzca: <b>{winner}</b>
            </Typography>
        </Box>
    );
};

export default AuctionStatus;
