import React, {useState, useRef} from "react";
import {useNavigate} from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import { usePostAuction } from '../../hooks/usePostAuction'
import { transformDateToDateFormat } from "./Services/DateTransformer";

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
import {AuctionFilters} from "../../services/fetchAuctions";
import {usePostImages} from "../../hooks/usePostImage";
import { AuctionDto } from './AuctionDto'
import imageCompression from "browser-image-compression";

const AddPage = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const rteRef = useRef<RichTextEditorRef>(null);
    const [croppedImage, setCroppedImage] = useState<any | null>(null);
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
                    <TitleSection title={title} setTitle={setTitle} />
                    <DescriptionEditor rteRef={rteRef} />
                    <PriceSection price={price} setPrice={setPrice} />
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
                    <FormButtonsSection croppedImage={croppedImage} isModerator={wantsToBeModerator} title={title} descriptionRteRef={rteRef} selectedDate={selectedDate} selectedCity={selectedCity} price={price}/>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

interface ImageUploadSectionProps {
    setCroppedImage: (img: any | null) => void;
}

const ImageUploadSection = ({setCroppedImage}: ImageUploadSectionProps) => (
    <Stack spacing={2} sx={ImageUploadStackStyle}>
        <Typography variant="body1" fontWeight={500}>
            Dodaj zdjęcie
        </Typography>

        <ImageUploadBox setCroppedImage={setCroppedImage}/>
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
            options={["Wrocław", "Kraków"]}
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
    const dates = ['21 listopada', '22 listopada', '23 listopada'];

    return (
        <Stack spacing={2} sx={{width: '100%'}}>
            <ControlledCheckbox
                checked={wantsToBeModerator}
                onChange={handleModerator}
                label="Chcę być moderatorem"
            />

            <Typography
                variant="body2"
                sx={{color: wantsToBeModerator ? 'text.primary' : 'text.disabled'}}
            >
                Wybierz preferowaną datę licytacji
            </Typography>

            <DateToggleGroup
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                disabled={!wantsToBeModerator}
                dates={dates}
            />
        </Stack>
    );
};

interface FormButtonsSectionProps {
    croppedImage: any | null;
    isModerator: boolean;
    title: string;
    descriptionRteRef: React.RefObject<RichTextEditorRef | null>;
    selectedDate: string;
    selectedCity: string;
    price: string;
}

const FormButtonsSection = ({croppedImage, isModerator, title, price, selectedCity, selectedDate, descriptionRteRef}: FormButtonsSectionProps) => {
    const navigate = useNavigate();
    const { mutate: postImage, isSuccess: isImageSuccess, isError: isImageError } = usePostImages();
    const { mutate, isSuccess, isError } = usePostAuction();
    const [successMessage, setSuccessMessage] = useState<String>("");
    const [errorMessage, setErrorMessage] = useState<String>("");

    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 730,
        useWebWorker: true,
    };

    const handleSubmit = async () => {
        let compressedCroppedImage = null;
        try {
            if(croppedImage) {
                compressedCroppedImage = await imageCompression(croppedImage, options);
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
                            setTimeout(() => {
                                navigate("/auctions");
                            }, 80);
                        },
                        onError: () => {
                            setErrorMessage("Błąd podczas dodawania aukcji");
                        }});
                },
                onError: () => {
                    setErrorMessage("Błąd podczas dodawania zdjęcia");
                }});

        } catch (error) {
            console.error("Błąd kompresji zdjęcia", error);
        }
}

    return (
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
    );
};
export default AddPage;