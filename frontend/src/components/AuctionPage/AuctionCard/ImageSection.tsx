import React from "react";
import {Box, CardMedia, Grid2} from "@mui/material";
import {ImageWrapperStyle, ImageStyle} from "./AuctionCard.styles";
import {useGetImages} from "../../../hooks/useGetImages";

type Props = {
    imageUrl: string;
};

const ImageSection = ({imageUrl}: Props) => {
    const { data: blobUrl, isLoading } = useGetImages(imageUrl);

    return (
        <Grid2 size={{xs: 12, md: 3}} sx={ImageWrapperStyle}>
            <Box height="100%">
                {!isLoading && blobUrl && (
                    <CardMedia
                        component="img"
                        image={blobUrl}
                        alt="Auction item"
                        sx={ImageStyle}
                    />
                )}
            </Box>
        </Grid2>
    );
}

export default ImageSection;
