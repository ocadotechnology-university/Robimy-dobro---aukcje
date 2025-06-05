import React from "react";
import {Typography} from "@mui/material";
import DOMPurify from 'dompurify';
import ExpandText from "./ExpandText";

type Props = {
    description: string;
};

const AuctionDescription = ({description}: Props) => {
    const cleanedHTMLDescription = DOMPurify.sanitize(description);

    return (
            // <Typography
            //     variant="body2"
            //     color="text.secondary"
            //     component="div"
            //     dangerouslySetInnerHTML={{ __html: cleanedHTMLDescription }}
            // />
        <ExpandText text={cleanedHTMLDescription} maxLength={350}/>
        );
};

export default AuctionDescription;
