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
            {/*<Box height="100%">*/}
            {/*    { isLoading && <Skeleton*/}
            {/*        variant="rectangular"*/}
            {/*        sx={{*/}
            {/*            ...ImageStyle,*/}
            {/*            width: '100%',*/}
            {/*            height: '100%'*/}
            {/*        }}*/}
            {/*    />*/}
            {/*    }*/}
            {/*    { blobUrl && (*/}
            {/*        <CardMedia*/}
            {/*            component="img"*/}
            {/*            image={blobUrl}*/}
            {/*            alt="Auction item"*/}
            {/*            sx={ImageStyle}*/}
            {/*        />*/}
            {/*    )}*/}
            {/*</Box>*/}
            <ImageUploadBox setCroppedImage={setCroppedImage} updateBlobImage={blob} updateBlobImageUrl={blobUrl}/>
        </Grid2>
    );
}

export default UpdateImageSection;
