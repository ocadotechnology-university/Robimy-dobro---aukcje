import React, {useEffect} from 'react';
import Box from '@mui/material/Box';
import UploadIcon from '@mui/icons-material/Upload';
import {useState} from 'react';
import { PercentCrop } from 'react-image-crop';
import Stack from "@mui/material/Stack";
import {
    boxStyleBeforeUpload,
    modalStyle,
    imageInModalStyle,
    imageInFormStyle,
    imageButtonsStyle
} from './ImageUploadBox.styles'
import {Modal} from '@mui/material';
import ReactCrop, {centerCrop, type Crop, makeAspectCrop} from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import Button from "@mui/material/Button";
import {getCroppedImage} from "./Services/CropImage";
import CropConfirmButton from "./CropConfirmButton"

interface ImageUploadBoxProps {
    setCroppedImage: (img: Blob | File | null) => void;
    updateBlobImage: Blob | undefined;
    updateBlobImageUrl: string | null;
}

const MIN_DIMENSION = 100
const MAX_DIMENSION = 700
const ASPECT_RATIO = 1

const ImageUploadBox = ({setCroppedImage, updateBlobImage, updateBlobImageUrl}: ImageUploadBoxProps) => {
    const [imageSrc, setImageSrc] = useState<string | null>(null)
    const [imageSrcBackup, setImageSrcBackup] = useState<string | null>(null)
    const [isUpload, setIsUpload] = useState(false)
    const [crop, setCrop] = useState<Crop>()
    const [croppedAreaPercent, setCroppedAreaPercent] = useState<PercentCrop | null>(null);
    const [displayCroppedImage, setDisplayCroppedImage] = useState<string | null>(null);
    const [open, setOpen] = React.useState(false);
    const [savedCrop, setSavedCrop] = useState<Crop>();
    const [savedCropBackup, setSavedCropBackup] = useState<Crop>();
    const [croppedImageTemp, setCroppedImageTemp] = useState<Blob>();

    useEffect(() => {
        if (updateBlobImage !== undefined) {
            setImageSrc(updateBlobImageUrl);
            setImageSrcBackup(updateBlobImageUrl);
            setIsUpload(true);
            setDisplayCroppedImage(updateBlobImageUrl);
            setCroppedImage(updateBlobImage);
        }
    }, [updateBlobImageUrl]);

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
        setSavedCrop(undefined)
    }

    const handleClose = () => {
        setOpen(false);
        setImageSrc(imageSrcBackup);
        setSavedCrop(savedCropBackup);
    }

    const handleEditOpen = () => {
        setOpen(true);
        setCrop(savedCrop);
        setImageSrc(imageSrcBackup);
    }

    const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        if (savedCrop) {
            setCrop(savedCrop);
            return;
        }

        const {width, height} = e.currentTarget;
        const takeByWidth = width >= height;

        const crop = makeAspectCrop(
            {
                unit: '%',
                width: takeByWidth ? (height/width*100) : 100,
                height: takeByWidth ? 100 : (width/height*100)
            }, ASPECT_RATIO, width, height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    }

    const onApproveImage = async () => {
        setOpen(false)

        if (imageSrc && croppedAreaPercent) {
            const croppedImage = await getCroppedImage(imageSrc, croppedAreaPercent);
            setCroppedImage(croppedImage);
            setCroppedImageTemp(croppedImage);
            setImageSrcBackup(imageSrc);
            setSavedCropBackup(savedCrop);

            const objectURL = URL.createObjectURL(croppedImage);
            setDisplayCroppedImage(objectURL);
        }
    }

    return (
        <Stack flexDirection="column" gap={0.5} alignItems='center'>

            {!isUpload ?
                <Box onClick={handleOpen} component="label" sx={boxStyleBeforeUpload}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="input-image-button"
                        type="file"
                        onChange={onFileChange}
                        key={imageSrc ? imageSrc : 'input-image-button'}
                    />

                    <UploadIcon fontSize="large" sx={(theme) => ({color: theme.palette.grey[600]})}/>
                </Box>
                : <Button component="label" onClick={handleOpen} sx={imageButtonsStyle}>
                    <input
                        accept="image/*"
                        style={{display: 'none'}}
                        id="input-image-button"
                        type="file"
                        onChange={onFileChange}
                        key={imageSrc ? imageSrc : 'input-image-button'}
                    />
                    Zmień zdjęcie
                </Button>}

            {imageSrc && (
                <Modal
                    open={open}
                    onClose={handleClose}
                    sx={modalStyle}
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
                            onComplete={(pixelCrop, percentageCrop) => {
                                setCroppedAreaPercent(percentageCrop)
                                setSavedCrop(percentageCrop)
                            }}
                        >
                            <img src={imageSrc} onLoad={onImageLoad} style={imageInModalStyle}/>
                        </ReactCrop>

                        <CropConfirmButton onClick={onApproveImage}/>
                    </Stack>
                </Modal>
            )}

            {displayCroppedImage && (
                <>
                    <img src={displayCroppedImage} style={imageInFormStyle}/>
                    <Button onClick={handleEditOpen} sx={imageButtonsStyle}>Edytuj</Button>

                </>
            )}
        </Stack>
    );
};
export default ImageUploadBox;
