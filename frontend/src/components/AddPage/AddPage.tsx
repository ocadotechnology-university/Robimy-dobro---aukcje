import React, {useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import {usePostAuction} from '../../hooks/usePostAuction'
import {transformDateToDateFormat} from "./Services/DateTransformer";

import {
    FormContainerStyle,
    ImageUploadStackStyle,
    FormButtonsWrapperStyle,
} from './AddPage.styles';

import TitleTextField from "../common/TitleTextField";
import PriceTextField from "../common/PriceTextField";
import DescriptionEditor from "../common/DescriptionEditor/DescriptionEditor";
import ImageUploadBox from "../common/ImageUploadBox";
import ControlledCheckbox from "../common/ControlledCheckbox";
import CitySelectField from "../common/CitySelectField";
import DateToggleGroup from "../common/DateToggleGroup";
import OutlinedActionButton from "../common/OutlinedActionButton";
import PrimaryActionButton from "../common/PrimaryActionButton";
import {RichTextEditorRef} from "mui-tiptap";
import {usePostImages} from "../../hooks/usePostImage";
import {AuctionDto} from './AuctionDto'
import imageCompression from "browser-image-compression";
import {CircularProgress, Snackbar} from "@mui/material";

const AddPage = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const rteRef = useRef<RichTextEditorRef>(null);
    const [croppedImage, setCroppedImage] = useState<File | Blob | null>(null);
    const fileId = "";

    const handlePickup = (value: boolean) => {
        setPickupOnlyInCity(value);
        if (!value) setSelectedCity('');
    };

    const handleModerator = (value: boolean) => {
        setWantsToBeModerator(value);
        setSelectedDate(value ? '21 listopada' : '');
    };

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={FormContainerStyle}>
                <Stack spacing={4}>
                    <ImageUploadSection setCroppedImage={setCroppedImage}/>
                    <TitleSection title={title} setTitle={setTitle}/>
                    <DescriptionEditor rteRef={rteRef} initialDescription={""}/>
                    <PriceSection price={price} setPrice={setPrice}/>
                    <CitySection
                        pickupOnlyInCity={pickupOnlyInCity}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                        handlePickup={handlePickup}
                    />
                    <ModeratorSection
                        wantsToBeModerator={wantsToBeModerator}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        handleModerator={handleModerator}
                    />
                    <FormButtonsSection croppedImage={croppedImage} isModerator={wantsToBeModerator} title={title}
                                        descriptionRteRef={rteRef} selectedDate={selectedDate}
                                        selectedCity={selectedCity} price={price}/>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

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

type TitleSectionProps = {
    title: string;
    setTitle: (value: string) => void;
};

const TitleSection = ({title, setTitle}: TitleSectionProps) => (
    <Box sx={{width: '100%'}}>
        <TitleTextField title={title} setTitle={setTitle}/>
    </Box>
);

type PriceSectionProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceSection = ({price, setPrice}: PriceSectionProps) => (
    <Box sx={{width: '25%'}}>
        <PriceTextField price={price} setPrice={setPrice}/>
    </Box>
);

type CitySectionProps = {
    pickupOnlyInCity: boolean;
    selectedCity: string;
    setSelectedCity: (value: string) => void;
    handlePickup: (checked: boolean) => void;
};

const CitySection = ({
                         pickupOnlyInCity,
                         selectedCity,
                         setSelectedCity,
                         handlePickup,
                     }: CitySectionProps) => (
    <Stack spacing={2}>
        <ControlledCheckbox
            checked={pickupOnlyInCity}
            onChange={handlePickup}
            label="Odbiór jest możliwy tylko w wybranym mieście"
        />

        <CitySelectField
            selectedCity={selectedCity}
            setSelectedCity={setSelectedCity}
            disabled={!pickupOnlyInCity}
        />
    </Stack>
);

type ModeratorSectionProps = {
    wantsToBeModerator: boolean;
    selectedDate: string;
    setSelectedDate: (value: string) => void;
    handleModerator: (checked: boolean) => void;
};

const ModeratorSection = ({
                              wantsToBeModerator,
                              selectedDate,
                              setSelectedDate,
                              handleModerator,
                          }: ModeratorSectionProps) => {

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <ControlledCheckbox
                checked={wantsToBeModerator}
                onChange={handleModerator}
                label="Chcę być moderatorem"
            />

            <Typography
                variant="body2"
                sx={{color: (theme) => wantsToBeModerator ? theme.palette.text.primary : theme.palette.text.disabled}}
            >
                Wybierz preferowaną datę licytacji
            </Typography>

            <DateToggleGroup
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                disabled={!wantsToBeModerator}
            />
        </Stack>
    );
};

interface FormButtonsSectionProps {
    croppedImage: File | Blob | null;
    isModerator: boolean;
    title: string;
    descriptionRteRef: React.RefObject<RichTextEditorRef | null>;
    selectedDate: string;
    selectedCity: string;
    price: string;
}

const FormButtonsSection = ({
                                croppedImage,
                                isModerator,
                                title,
                                price,
                                selectedCity,
                                selectedDate,
                                descriptionRteRef
                            }: FormButtonsSectionProps) => {
    const navigate = useNavigate();
    const {mutate: postImage, isSuccess: isImageSuccess, isError: isImageError} = usePostImages();
    const {mutate, isSuccess, isError} = usePostAuction();
    const [successMessage, setSuccessMessage] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
    const [isLoading, setIsLoading] = useState(false);

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 730,
        useWebWorker: true,
    };

    const handleSubmit = async () => {
        let compressedCroppedImage = null;
        setIsLoading(true);

        try {
            if (croppedImage) {
                const fileFromBlob = new File([croppedImage], `cropped-${Date.now()}.jpg`, { type: croppedImage.type });
                compressedCroppedImage = await imageCompression(fileFromBlob, options);
            } else {
                compressedCroppedImage = croppedImage;
            }

            postImage(compressedCroppedImage, {
                onSuccess: (fileId: string) => {
                    const newAuction: AuctionDto = {
                        wantsToBeModerator: isModerator,
                        title: title || undefined,
                        description: descriptionRteRef.current?.editor?.getHTML() || undefined,
                        fileId: fileId || undefined,
                        auctionDate: transformDateToDateFormat(selectedDate) || undefined,
                        city: selectedCity || undefined,
                        startingPrice: parseFloat(price) || undefined
                    };

                    mutate(newAuction, {
                        onSuccess: () => {
                            setSuccessMessage("Pomyślnie dodano aukcję");
                            setSnackbarMessage("Pomyślnie dodano aukcję");
                            setSnackbarSeverity("success");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                            navigate("/auctions");
                        },
                        onError: () => {
                            setErrorMessage("Błąd podczas dodawania aukcji");
                            setSnackbarMessage("Błąd podczas dodawania aukcji");
                            setSnackbarSeverity("error");
                            setSnackbarOpen(true);
                            setIsLoading(false);
                        }
                    });
                },
                onError: () => {
                    setErrorMessage("Błąd podczas dodawania zdjęcia");
                    setIsLoading(false);
                }
            });

        } catch (error) {
            console.error("Błąd kompresji zdjęcia", error);
            setIsLoading(false);
        }
    }

    return (
        <>
            <Stack direction="row" justifyContent="space-between" sx={FormButtonsWrapperStyle}>
                <OutlinedActionButton
                    label="Wróć"
                    onClick={() => navigate(-1)}
                />

                {isSuccess && <Alert severity="success">{successMessage}</Alert>}
                {isError && <Alert severity="error">{errorMessage}</Alert>}

                <PrimaryActionButton
                    label="Dodaj"
                    onClick={handleSubmit}
                />
            </Stack>

            {isLoading && (
                <Stack justifyContent="center" alignItems="center" marginTop={3}>
                    <CircularProgress color={"primary"}/>
                </Stack>
            )}

            <Snackbar
                anchorOrigin={{vertical: "top", horizontal: "center"}}
                open={snackbarOpen}
                onClose={() => setSnackbarOpen(false)}
                autoHideDuration={2000}
                key="top-center"
            >
                <Alert
                    onClose={() => setSnackbarOpen(false)}
                    severity={snackbarSeverity}
                    variant="filled"
                    sx={{width: "100%"}}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};
export default AddPage;