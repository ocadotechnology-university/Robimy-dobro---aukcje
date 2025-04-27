import React from 'react';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import { useState } from 'react'
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import {boxStyleBeforeUpload, boxStyleAfterUpload} from './ImageUploadBox.styles'
import { Modal } from '@mui/material';
import ReactCrop, {centerCrop, type Crop, makeAspectCrop, PercentCrop, PixelCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

interface ImageUploadBoxProps {
    setSrcImage: (img: string | null) => void;
    setCroppedAreaPixels: (area: any) => void;
}

const MIN_DIMENSION = 100
const MAX_DIMENSION = 500
const ASPECT_RATIO = 1

const ImageUploadBox = ({setSrcImage, setCroppedAreaPixels}: ImageUploadBoxProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [isUpload, setIsUpload] = useState(false)
    // const [crop, setCrop] = useState({x: 0, y: 0 })
    const [crop, setCrop] = useState<Crop>()
    const [zoom, setZoom] = useState(1)
    const cropSize = {width: 200, height: 200}

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
            setIsUpload(true);
        }
    };

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
        setImageSrc(null);
        setCrop(undefined);
        setOpen(true);
    }
    const handleClose = () => setOpen(false);

    const onImageLoad = (e: any) => {
        const {width, height} = e.currentTarget;
        const crop = makeAspectCrop(
            {
                unit: '%',
                width: 25,
                height: 25
            }, ASPECT_RATIO, width, height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }

    return (
        <Stack flexDirection="column" gap={2}>
            <Box onClick={handleOpen} component="label" sx={!isUpload ? boxStyleBeforeUpload : boxStyleAfterUpload}>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="input-image-button"
                    type="file"
                    onChange={onFileChange}
                />
                {!isUpload ?
                    <UploadIcon fontSize="large" sx={{color: '#666'}}/>
                    : <Typography variant="body2" fontWeight={400}>Zmień zdjęcie</Typography>}
            </Box>

            {imageSrc && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', backdropFilter: 'blur(10px)' }}
                >
                    <Stack alignItems="center" justifyContent="center" maxWidth='100%' maxHeight='100%'>
                        <ReactCrop
                            crop={crop}
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                            maxWidth={MAX_DIMENSION}
                            minHeight={MIN_DIMENSION}
                            maxHeight={MAX_DIMENSION}
                            onChange={(pixelCrop, percentageCrop) => setCrop(percentageCrop)}
                            >
                        <img src={imageSrc} onLoad={onImageLoad} style={{
                            objectFit: 'contain',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            objectPosition: 'center',
                        }}/>
                    </ReactCrop>
                </Stack>
            </Modal>
            )}
        </Stack>
    );
};
export default ImageUploadBox;
