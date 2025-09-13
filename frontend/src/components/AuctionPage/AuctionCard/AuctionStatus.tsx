import React from "react";
import {Box, Typography} from "@mui/material";
import {getStatusLabel} from "./helpers";
import Dot from "../../common/Dot";

type Props = {
    status: string;
    supplier: string;
    winner: string;
};

const AuctionStatus = ({status, supplier, winner}: Props) => {
    const statusLabel = getStatusLabel(status);
    const isLive = status === "IN_PROGRESS";

    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1} paddingBottom={1}>
            <Typography variant="body2">
                Status licytacji:{" "}
                <b style={{color: isLive ? "green" : "inherit", display: "inline-flex", alignItems: "center"}}>
                    {statusLabel}
                    {isLive && (
                        <Box display="flex" ml={0.2}>
                            <Dot/>
                            <Dot/>
                            <Dot/>
                        </Box>
                    )}
                </b>
                <br/>
                Dostawca: <b>{supplier}</b>
                <br/>
                {winner && (
                    <>
                        Zwycięzca: <b>{winner}</b>
                    </>
                )}
            </Typography>
        </Box>
    );
};

export default AuctionStatus;
