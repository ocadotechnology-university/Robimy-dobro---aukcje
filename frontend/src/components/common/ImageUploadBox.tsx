import React from 'react';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import {useState} from 'react'
import Stack from "@mui/material/Stack";
import Typography from '@mui/material/Typography';
import {boxStyleBeforeUpload, boxStyleAfterUpload, modalStyle, imageInModalStyle, imageInFormStyle} from './ImageUploadBox.styles'
import {Modal} from '@mui/material';
import ReactCrop, {centerCrop, type Crop, makeAspectCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import {getCroppedImage} from "./Services/CropImage";
import CropConfirmButton from "./CropConfirmButton"

interface ImageUploadBoxProps {
    setCroppedImage: (img: any | null) => void;
}

const MIN_DIMENSION = 100
const MAX_DIMENSION = 700
const ASPECT_RATIO = 1

const ImageUploadBox = ({setCroppedImage}: ImageUploadBoxProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [isUpload, setIsUpload] = useState(false)
    const [crop, setCrop] = useState<Crop>()
    const [croppedAreaPercent, setCroppedAreaPercent] = useState<any>(null)
    const [displayCroppedImage, setDisplayCroppedImage] = useState<any>(null)
    const [open, setOpen] = React.useState(false);

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
            setIsUpload(true);
        }
    };

    const handleOpen = () => {
        setImageSrc(null);
        setCrop(undefined);
        setOpen(true);
    }

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

    const onApproveImage = async () => {
        setOpen(false)
        console.log(imageSrc);
        console.log(croppedAreaPercent);

        if (imageSrc && croppedAreaPercent) {
            const croppedImage = await getCroppedImage(imageSrc, croppedAreaPercent);
            setCroppedImage(croppedImage);

            const objectURL = URL.createObjectURL(croppedImage);
            setDisplayCroppedImage(objectURL);
        }
    }

    return (
        <Stack flexDirection="column" gap={2} alignItems='center'>
            <Box onClick={handleOpen} component="label" sx={!isUpload ? boxStyleBeforeUpload : boxStyleAfterUpload}>
                <input
                    accept="image/*"
                    style={{display: 'none'}}
                    id="input-image-button"
                    type="file"
                    onChange={onFileChange}
                    key={imageSrc ? imageSrc : 'input-image-button'}
                />
                {!isUpload ?
                    <UploadIcon fontSize="large" sx={{color: '#666'}}/>
                    : <Typography variant="body2" fontWeight={400}>Zmień zdjęcie</Typography>}
            </Box>

            {imageSrc && (
                <Modal
                    open={open}
                    sx={{modalStyle}}
                >
                    <Stack alignItems="center" justifyContent="center" maxWidth='100%' maxHeight='100%' gap={3}>
                        <ReactCrop
                            crop={crop}
                            keepSelection
                            aspect={ASPECT_RATIO}
                            minWidth={MIN_DIMENSION}
                            maxWidth={MAX_DIMENSION}
                            minHeight={MIN_DIMENSION}
                            maxHeight={MAX_DIMENSION}
                            onChange={(pixelCrop, percentageCrop) => {
                                setCrop(percentageCrop)
                            }}
                            onComplete={(pixelCrop, percentageCrop)=> {
                                setCrop(percentageCrop)
                                setCroppedAreaPercent(percentageCrop)
                            }}
                        >
                            <img src={imageSrc} onLoad={onImageLoad} style={imageInModalStyle}/>
                        </ReactCrop>

                        <CropConfirmButton onClick={onApproveImage}/>
                    </Stack>
                </Modal>
            )}

            {displayCroppedImage && (
                <img src={displayCroppedImage} style={imageInFormStyle}/>
            )}
        </Stack>
    );
};
export default ImageUploadBox;
