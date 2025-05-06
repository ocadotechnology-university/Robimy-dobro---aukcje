import React from "react";
import {Typography} from "@mui/material";
import DOMPurify from 'dompurify';

type Props = {
    description: string;
};

const AuctionDescription = ({description}: Props) => {
    const cleanedHTMLDescription = DOMPurify.sanitize(description);

    return (
            <Typography
                variant="body2"
                color="text.secondary"
                component="div"
                dangerouslySetInnerHTML={{ __html: cleanedHTMLDescription }}
            />
        );
};

export default AuctionDescription;
