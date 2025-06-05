import React, {useEffect, useState, useRef } from "react";
import {Button, Typography, Link} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

type ExpandTitleProps = {
    text: string;
    maxLength: number;
}

const ExpandText = ({text, maxLength}: ExpandTitleProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const title = text ? text : "";
    const textLength = text ? text.length : 0;
    const isTooLong = textLength > maxLength;
    const slicedTitle = text ? text.slice(0, maxLength) : text;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
//         <Typography variant="body2" color="text.secondary" component="div">
//         {!isTooLong ? (
//         parse(text)
//     ) : isExpanded ?
//         (<span>
//             {parse(removeParagraphTags(text))}&nbsp;
//     <Link
//         component="button"
//     variant="body2"
//     onClick={() => setIsExpanded(!isExpanded)}
//     sx={{ display: "inline", padding: 0, minWidth: 0 }}
// >
//     {'Zobacz mniej'}
//     </Link>
//     </span>
// ) : (<>
//         {parse(removeParagraphTags(text.slice(0, maxLength + htmlTagsLength) + "... "))}&nbsp;
//     <Link
//         component="button"
//     variant="body2"
//     onClick={() => setIsExpanded(!isExpanded)}
// >
//     {'Zobacz więcej'}
//     </Link>
//     </>)
// }
//     </Typography>
        <>
            {!isTooLong || isExpanded ? (
                title
            ) : (
                slicedTitle
            )}

            {isTooLong && (
                <Button size="small" onClick={handleClick} sx={{padding: "0px", minWidth: 0, marginLeft: "1.5px", color: (theme) => theme.palette.primary.dark}}>
                    {isExpanded ? <KeyboardArrowUpIcon sx={{marginLeft: -0.5}}/> : <span style={{fontWeight: 800}}>...</span>}
                </Button>
            )}
        </>
    );

}

export default ExpandText;