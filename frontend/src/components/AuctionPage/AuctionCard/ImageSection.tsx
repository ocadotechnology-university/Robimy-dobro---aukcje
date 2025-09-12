import React, {useEffect, useState} from "react";
import {Box, CardMedia, Grid2, Skeleton} from "@mui/material";
import {ImageWrapperStyle, ImageStyle} from "./AuctionCard.styles";
import {useGetImages} from "../../../hooks/useGetImages";
import Stack from "@mui/material/Stack";

type Props = {
    fileId: string;
    status: string;
};

const ImageSection = ({fileId, status}: Props) => {
    const {data: blob, isLoading} = useGetImages(fileId);
    const [blobUrl, setBlobUrl] = useState<string | null>(null);

    useEffect(() => {
        if (blob) {
            const url = URL.createObjectURL(blob);
            setBlobUrl(url);
            return () => URL.revokeObjectURL(url);
        }
    }, [blob]);

    return (
        <Grid2 size={{xs: 12, md: 3}} sx={ImageWrapperStyle}>
            <Stack height="100%" justifyContent="center">
                {isLoading && <Skeleton
                    variant="rectangular"
                    sx={{
                        ...ImageStyle,
                        width: '100%',
                        height: '100%'
                    }}
                />
                }
                {blobUrl && (
                    <CardMedia
                        component="img"
                        image={blobUrl}
                        alt="Auction item"
                        sx={ImageStyle(status === "FINISHED")}
                    />
                )}
            </Stack>
        </Grid2>
    );
}

export default ImageSection;
