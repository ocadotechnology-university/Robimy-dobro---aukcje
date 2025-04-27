import React from "react";
import {Box, CardMedia, Grid2} from "@mui/material";
import {ImageWrapperStyle, ImageStyle} from "./AuctionCard.styles";

type Props = {
    imageUrl: string;
};

const ImageSection = ({imageUrl}: Props) => (
    <Grid2 size={{xs: 12, md: 3}} sx={ImageWrapperStyle}>
        <Box height="100%">
            <CardMedia
                component="img"
                image={`http://localhost:8080/images/${imageUrl}`}
                alt="Auction item"
                sx={ImageStyle}
            />
        </Box>
    </Grid2>
);

export default ImageSection;
