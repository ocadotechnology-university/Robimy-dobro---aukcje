import React from 'react';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react'
import Cropper from 'react-easy-crop'
import Stack from "@mui/material/Stack";

const boxStyle = {
    alignSelf: 'center',
    width: 200,
    height: 120,
    border: '2px solid #aaa',
    borderRadius: 2,
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
};

interface ImageUploadBoxProps {
    setCroppedImage: (img: string | null) => void;
}

const ImageUploadBox = ({setCroppedImage}:ImageUploadBoxProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [crop, setCrop] = useState({x: 0, y: 0})
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

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
        }
    };

    return (
        <Stack flexDirection="column" gap={2}>
            <Box component="label" sx={boxStyle}>
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="input-image-button"
                    type="file"
                    onChange={onFileChange}
                />
                <UploadIcon fontSize="large" sx={{ color: '#666' }} />
            </Box>

            {imageSrc && (
                <Box sx={{ width: '100%', height: 200, position: 'relative' }}>
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={1}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />
                </Box>
            )}
        </Stack>
    );
};
export default ImageUploadBox;
