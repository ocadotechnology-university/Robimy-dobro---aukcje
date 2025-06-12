import React, {useState, useRef, useLayoutEffect, useEffect} from "react";
import {Button, Typography, Link} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Box from "@mui/material/Box";
import { Popper, styled } from '@mui/material';
import theme from "../../../theme/theme";


type ExpandTitleProps = {
    text: string;
}

const ExpandText = ({text}: ExpandTitleProps) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);
    const ref = useRef<HTMLHeadingElement | null>(null);

    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!anchorRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (let entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(anchorRef.current);

        return () => observer.disconnect();
    }, []);

    const title = text ? text : "";
    const textLength = text ? text.length : 0;
    const textLengthPixels = getTextWidth(text);
    const dotsLengthPixels = getTextWidth("...");
    const maxLength = getTextCharacterCount(width-dotsLengthPixels, text);

    console.log(width);
    console.log(textLengthPixels);
    const isTooLong = textLengthPixels > width;
    const slicedTitle = text ? text.slice(0, maxLength) : text;

    const handleClick = () => {
        setIsExpanded(!isExpanded);
    }

    function getTextWidth(text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if(context) {
            const fontVariant = theme.typography.h6;
            const fontSize = fontVariant?.fontSize || '17px';
            const fontWeight = "bold";
            const fontFamily = theme.typography.fontFamily || 'sans-serif';

            context.font = `${fontWeight} ${fontSize} ${fontFamily}`;
            return context.measureText(text).width;
        }

        return 0;
    }

    function getTextCharacterCount(pixelWidth: number, text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
            const fontVariant = theme.typography.h6;
            const fontSize = fontVariant?.fontSize || '17px';
            const fontWeight = "bold";
            const fontFamily = theme.typography.fontFamily || 'sans-serif';

            context.font = `${fontWeight} ${fontSize} ${fontFamily}`;

            const totalWidth = context.measureText(text).width;
            const averageCharWidth = totalWidth / text.length;

            return Math.floor(pixelWidth / averageCharWidth);
        }

        return 0;
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
            sx={{cursor: isTooLong ? 'pointer' : 'default', width: '100%'}}
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