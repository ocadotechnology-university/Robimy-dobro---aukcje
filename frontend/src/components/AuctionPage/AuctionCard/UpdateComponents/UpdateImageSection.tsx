import React, {useEffect, useState} from "react";
import {Box, CardMedia, Grid2, Skeleton} from "@mui/material";
import {ImageWrapperStyle, ImageStyle} from "../AuctionCard.styles";
import {useGetImages} from "../../../../hooks/useGetImages";
import ImageUploadBox from "../../../common/ImageUploadBox";

type Props = {
    fileId: string;
    setFileId: (value: string) => void;
    setCroppedImage: (img: any | null) => void;
};

const UpdateImageSection = ({fileId, setFileId, setCroppedImage}: Props) => {
    const { data: blob, isLoading } = useGetImages(fileId);
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
            <ImageUploadBox setCroppedImage={setCroppedImage} updateBlobImage={blob} updateBlobImageUrl={blobUrl}/>
        </Grid2>
    );
}

export default UpdateImageSection;
