import React, {useEffect, useState} from "react";
import {Grid2} from "@mui/material";
import {UpdateImageWrapperStyle} from "../AuctionCard.styles";
import {useGetImages} from "../../../../hooks/useGetImages";
import ImageUploadBox from "../../../common/ImageUploadBox";

type Props = {
    fileId: string;
    setFileId: (value: string) => void;
    setCroppedImage: (img: Blob | File | null) => void;
};

const UpdateImageSection = ({fileId, setFileId, setCroppedImage}: Props) => {
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
        <Grid2 size={{xs: 12, md: 4.5, lg: 3.7}} sx={UpdateImageWrapperStyle}>
            <ImageUploadBox setCroppedImage={setCroppedImage} updateBlobImage={blob} updateBlobImageUrl={blobUrl}/>
        </Grid2>
    );
}

export default UpdateImageSection;
