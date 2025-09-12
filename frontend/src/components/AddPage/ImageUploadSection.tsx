import React from "react";
import {Typography, Stack} from "@mui/material";
import {ImageUploadStackStyle} from "./AddPage.styles";
import ImageUploadBox from "../common/ImageUploadBox";

interface ImageUploadSectionProps {
    setCroppedImage: (img: File | Blob | null) => void;
}

const ImageUploadSection = ({setCroppedImage}: ImageUploadSectionProps) => (
    <Stack spacing={2} sx={ImageUploadStackStyle}>
        <Typography variant="body1" fontWeight={500}>
            Dodaj zdjęcie
        </Typography>

        <ImageUploadBox setCroppedImage={setCroppedImage} updateBlobImage={undefined} updateBlobImageUrl={null}/>
    </Stack>
);

export default ImageUploadSection;