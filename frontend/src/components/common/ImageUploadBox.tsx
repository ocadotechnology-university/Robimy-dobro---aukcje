import React from 'react';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import {boxStyleBeforeUpload, boxStyleAfterUpload} from './ImageUploadBox.styles'

interface ImageUploadBoxProps {
    setSrcImage: (img: string | null) => void;
    setCroppedAreaPixels: (area: any) => void;
}

const ImageUploadBox = ({setSrcImage, setCroppedAreaPixels}:ImageUploadBoxProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const cropSize = { width: 200, height: 200 }

    const onCropComplete = (croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']

        if (file && !allowedTypes.includes(file.type)) {
            alert("Niepoprawne rozszerzenie wybranego pliku");
            e.target.value = '';
            return;
        }

        if (file) {
            const url = URL.createObjectURL(file);
            setImageSrc(url);
            setSrcImage(url);
        }
    };


    return (
        <Stack flexDirection="column" gap={2}>
            <Box component="label" sx={ !imageSrc ? boxStyleBeforeUpload : boxStyleAfterUpload }>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="input-image-button"
                    type="file"
                    onChange={onFileChange}
                />
                {!imageSrc ?
                <UploadIcon fontSize="large" sx={{ color: '#666' }} />
                    : <Typography variant="body2" fontWeight={400}>Zmień zdjęcie</Typography>}
            </Box>

            {imageSrc && (
                <Stack alignItems="center">
                <Box sx={{ width: '80%', height: 200, position: 'relative' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        cropSize={cropSize}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                        // restrictPosition={false}

                    />
                </Box>
                </Stack>
            )}
        </Stack>
    );
};
export default ImageUploadBox;
