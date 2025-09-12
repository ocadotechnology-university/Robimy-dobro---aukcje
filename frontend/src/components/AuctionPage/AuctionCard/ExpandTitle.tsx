import React, {useState, useRef, useEffect} from "react";
import {Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {Popper, styled} from '@mui/material';
import theme from "../../../theme/theme";

type ExpandTitleProps = {
    text: string;
}

const ExpandTitle = ({text}: ExpandTitleProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const anchorRef = useRef<HTMLDivElement | null>(null);

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
    const textLengthPixels = getTextWidth(title);
    const dotsLengthPixels = getTextWidth("...");
    const maxLength = getTextCharacterCount(width * 0.99 - dotsLengthPixels, title);

    const isTooLong = textLengthPixels > width * 0.99;
    const slicedTitle = title ? title.slice(0, maxLength) : title;

    function getTextWidth(text: string) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        if (context) {
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

    const StyledPopperDiv = styled('div')(({theme}) => ({
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
            {!isTooLong ? (
                title
            ) : (
                slicedTitle + "..."
            )}

            <Popper open={isHovered && isTooLong} placement="top" anchorEl={anchorRef.current}>
                <StyledPopperDiv style={{maxWidth: "50vw"}}>
                    <Typography fontWeight="bold" color="info.dark">
                        {title}
                    </Typography>
                </StyledPopperDiv>
            </Popper>
        </Box>
    );

}

export default ExpandTitle;