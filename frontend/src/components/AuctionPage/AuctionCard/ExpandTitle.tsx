import React, {useEffect, useState, useRef } from "react";
import {Button, Typography, Link} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from "@mui/material/Box";
import { Popper, styled } from '@mui/material';


type ExpandTitleProps = {
    text: string;
    maxLength: number;
}

const ExpandText = ({text, maxLength}: ExpandTitleProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);

    const title = text ? text : "";
    const textLength = text ? text.length : 0;
    const isTooLong = textLength > maxLength;
    const slicedTitle = text ? text.slice(0, maxLength) : text;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    const StyledPopperDiv = styled('div')(({ theme }) => ({
        padding: '10px 14px',
        backgroundColor: theme.palette.info.light,
        borderRadius: '5px',
        boxShadow: theme.shadows[3],
    }));

    return (
        <Box
            ref={anchorRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            sx={{cursor: isTooLong ? 'pointer' : 'default'}}
        >
            {!isTooLong || isExpanded ? (
                title
            ) : (
                slicedTitle + "..."
            )}

            <Popper open={isHovered && isTooLong} placement="top" anchorEl={anchorRef.current}>
                <StyledPopperDiv>
                    <Typography fontWeight="bold" color="info.dark">
                        {title}
                    </Typography>
                </StyledPopperDiv>
            </Popper >

            {/*{isTooLong && (*/}
            {/*    <Button size="small" onClick={handleClick} sx={{padding: "0px", minWidth: 0, marginLeft: "1.5px", color: (theme) => theme.palette.primary.dark}}>*/}
            {/*        {isExpanded ? <KeyboardArrowUpIcon sx={{marginLeft: -0.5}}/> : <span style={{fontWeight: 800}}>...</span>}*/}
            {/*    </Button>*/}
            {/*)}*/}
        </Box>
    );

}

export default ExpandText;