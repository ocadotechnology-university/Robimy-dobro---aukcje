import "./AddPage.css"
import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import MenuItem from '@mui/material/MenuItem';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import { FormContainerStyle } from './AddPage.styles';
import { ImageUploadStackStyle } from './AddPage.styles';
import { ImageUploadBoxStyle } from './AddPage.styles';
import { PriceUnitStyle } from './AddPage.styles';
import { CityCheckboxStyle } from './AddPage.styles';
import { CityLabelStyle } from './AddPage.styles';
import { CityLabelIconWrapperStyle } from './AddPage.styles';
import { CitySelectStyle } from './AddPage.styles';

const AddPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={FormContainerStyle}>
                <Stack spacing={4}>
                    <ImageUploadSection />
                    <TitleSection title={title} setTitle={setTitle} />
                    <PriceSection price={price} setPrice={setPrice} />
                    <CitySection
                        pickupOnlyInCity={pickupOnlyInCity}
                        setPickupOnlyInCity={setPickupOnlyInCity}
                        selectedCity={selectedCity}
                        setSelectedCity={setSelectedCity}
                    />

                    <div className="ModeratorFrame">
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={wantsToBeModerator}
                                    onChange={(e) => setWantsToBeModerator(e.target.checked)}
                                    className="ModeratorCheckbox"
                                />
                            }
                            label="Chcę być moderatorem"
                            className="ModeratorLabel"
                        />

                        <p className={`DateSelectLabel ${!wantsToBeModerator ? "disabled-label" : ""}`}>
                            Wybierz preferowaną datę licytacji
                        </p>

                        <div className="DateToggleGroup">
                            {["21", "22", "23"].map((day) => (
                                <button
                                    key={day}
                                    type="button"
                                    className={`DateToggle ${
                                        selectedDate === day ? "selected" : ""
                                    }`}
                                    disabled={!wantsToBeModerator}
                                    onClick={() => setSelectedDate(day)}
                                >
                                    <span className="material-symbols-outlined">event</span>
                                    {` ${day} listopada`}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="FormButtons">
                        <button className="BackButton">Wróć</button>
                        <button className="SubmitButton">Dodaj</button>
                    </div>
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

        <Box component="label" sx={ImageUploadBoxStyle}>
            <UploadIcon fontSize="large" sx={{ color: '#666' }} />
        </Box>
    </Stack>
);

type TitleSectionProps = {
    title: string;
    setTitle: (value: string) => void;
};

const TitleSection = ({ title, setTitle }: TitleSectionProps) => (
    <Box sx={{ width: '100%' }}>
        <TextField
            label="Tytuł"
            variant="outlined"
            fullWidth
            value={title}
            size={"small"}
            onChange={(e) => setTitle(e.target.value)}
            InputLabelProps={{ shrink: true }}
        />
    </Box>
);

type PriceSectionProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceSection = ({ price, setPrice }: PriceSectionProps) => (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ width: '25%' }}>
        <TextField
            label={
                <>Cena wywoławcza</>
            }
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            onChange={(e) => setPrice(e.target.value)}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: 0 }}
        />
        <Typography variant="body2" sx={PriceUnitStyle}>zł</Typography>
    </Stack>
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
        <FormControlLabel
            control={
                <Checkbox
                    checked={pickupOnlyInCity}
                    onChange={(e) => setPickupOnlyInCity(e.target.checked)}
                    sx={CityCheckboxStyle}
                />
            }
            label="Odbiór jest możliwy tylko w wybranym mieście"
            sx={{
                ...CityLabelStyle,
                width: 'fit-content',
            }}
        />

        <TextField
            select
            label={
                <Box component="span" sx={CityLabelIconWrapperStyle}>
                    Miasto
                    <InfoOutlinedIcon
                        fontSize="small"
                        titleAccess="Wybierz miasto, w którym możliwy jest odbiór."
                        sx={{cursor: 'help' }}
                    />
                </Box>
            }
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            size="small"
            disabled={!pickupOnlyInCity}
            InputLabelProps={{ shrink: true }}
            sx={CitySelectStyle}
        >
            <MenuItem value="Wrocław">Wrocław</MenuItem>
            <MenuItem value="Kraków">Kraków</MenuItem>
        </TextField>
    </Stack>
);

export default AddPage;