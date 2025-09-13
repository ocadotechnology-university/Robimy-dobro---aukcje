import React from "react";
import DOMPurify from 'dompurify';
import ExpandText from "./ExpandText";

type Props = {
    description: string;
};

const AuctionDescription = ({description}: Props) => {
    const cleanedHTMLDescription = DOMPurify.sanitize(description);

    return (
        <ExpandText text={cleanedHTMLDescription} maxLinesNumber={4}/>
    );
};

export default AuctionDescription;
