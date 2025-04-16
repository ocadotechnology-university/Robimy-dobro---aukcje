import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';

import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ToggleButton from '@mui/material/ToggleButton';
import EventIcon from '@mui/icons-material/Event';
import Button from '@mui/material/Button';

import {
    FormContainerStyle,
    ImageUploadStackStyle,
    DateToggleButtonStyle,
    FormButtonsWrapperStyle,
    BackButtonStyle,
    SubmitButtonStyle,
} from './AddPage.styles';

import TitleTextField from "../common/TitleTextField";
import PriceTextField from "../common/PriceTextField";
import DescriptionEditor from "../common/DescriptionEditor/DescriptionEditor";
import ImageUploadBox from "../common/ImageUploadBox";
import ControlledCheckbox from "../common/ControlledCheckbox";
import CitySelectField from "../common/CitySelectField";
import {RichTextEditorRef} from "mui-tiptap";

const AddPage = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");
    const rteRef = useRef<RichTextEditorRef>(null);

    useEffect(() => {
        if (wantsToBeModerator && selectedDate === '') {
            setSelectedDate('21');
        }

        if (!wantsToBeModerator && selectedDate !== '') {
            setSelectedDate('');
        }
    }, [wantsToBeModerator]);

    useEffect(() => {
        if (!pickupOnlyInCity && selectedCity !== '') {
            setSelectedCity('');
        }
    }, [pickupOnlyInCity]);

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={FormContainerStyle}>
                <Stack spacing={4}>
                    <ImageUploadSection />
                    <TitleSection title={title} setTitle={setTitle} />
                    <DescriptionEditor rteRef={rteRef} />
                    <PriceSection price={price} setPrice={setPrice} />
                    <CitySection
                        pickupOnlyInCity={pickupOnlyInCity}
                        setPickupOnlyInCity={setPickupOnlyInCity}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                    />
                    <ModeratorSection
                        wantsToBeModerator={wantsToBeModerator}
                        setWantsToBeModerator={setWantsToBeModerator}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                    />
                    <FormButtonsSection />
                </Stack>
            </Container>
        </React.Fragment>
    );
}

const ImageUploadSection = () => (
    <Stack spacing={2} sx={ImageUploadStackStyle}>
        <Typography variant="body1" fontWeight={500}>
            Dodaj zdjęcie
        </Typography>

        <ImageUploadBox />
    </Stack>
);

type TitleSectionProps = {
    title: string;
    setTitle: (value: string) => void;
};

const TitleSection = ({ title, setTitle }: TitleSectionProps) => (
    <Box sx={{ width: '100%' }}>
        <TitleTextField title={title} setTitle={setTitle} />
    </Box>
);

type PriceSectionProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceSection = ({ price, setPrice }: PriceSectionProps) => (
    <Box sx={{ width: '25%' }}>
        <PriceTextField price={price} setPrice={setPrice} />
    </Box>
);

type CitySectionProps = {
    pickupOnlyInCity: boolean;
    setPickupOnlyInCity: (value: boolean) => void;
    selectedCity: string;
    setSelectedCity: (value: string) => void;
};

const CitySection = ({
                         pickupOnlyInCity,
                         setPickupOnlyInCity,
                         selectedCity,
                         setSelectedCity,
                     }: CitySectionProps) => (
    <Stack spacing={2}>
        <ControlledCheckbox
            checked={pickupOnlyInCity}
            onChange={setPickupOnlyInCity}
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
    setWantsToBeModerator: (value: boolean) => void;
    selectedDate: string;
    setSelectedDate: (value: string) => void;
};

const ModeratorSection = ({
                              wantsToBeModerator,
                              setWantsToBeModerator,
                              selectedDate,
                              setSelectedDate,
                          }: ModeratorSectionProps) => {
    const dates = ["21", "22", "23"];

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <ControlledCheckbox
                checked={wantsToBeModerator}
                onChange={setWantsToBeModerator}
                label="Chcę być moderatorem"
            />

            <Typography
                variant="body2"
                sx={{color: wantsToBeModerator ? 'text.primary' : 'text.disabled'}}
            >
                Wybierz preferowaną datę licytacji
            </Typography>

            <Stack direction="row" spacing={1}>
                {dates.map((day) => (
                    <ToggleButton
                        key={day}
                        value={day}
                        selected={selectedDate === day}
                        onChange={() => setSelectedDate(day)}
                        disabled={!wantsToBeModerator}
                        size="small"
                        sx={DateToggleButtonStyle(selectedDate === day)}
                    >
                        <EventIcon fontSize="small" />
                        {`${day} listopada`}
                    </ToggleButton>
                ))}
            </Stack>
        </Stack>
    );
};

const FormButtonsSection = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/auctions');
    };

    return (
        <Stack direction="row" justifyContent="space-between" sx={FormButtonsWrapperStyle}>
            <Button variant="outlined" color="inherit" sx={BackButtonStyle} onClick={() => navigate(-1)}>
                Wróć
            </Button>

            <Button variant="contained" sx={SubmitButtonStyle} onClick={handleSubmit}>
                Dodaj
            </Button>
        </Stack>
    );
};
export default AddPage;