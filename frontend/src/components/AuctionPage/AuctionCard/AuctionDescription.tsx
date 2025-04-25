import React from "react";
import {Typography} from "@mui/material";

type Props = {
    description: string;
};

const AuctionDescription = ({description}: Props) => (
    <Typography variant="body2" color="text.secondary">
        {description}
    </Typography>
);

export default AuctionDescription;
