import "./AddPage.css"
import React, { useState } from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import UploadIcon from '@mui/icons-material/Upload';
import TextField from '@mui/material/TextField';

import { FormContainerStyle } from './AddPage.styles';
import { ImageUploadStackStyle } from './AddPage.styles';
import { ImageUploadBoxStyle } from './AddPage.styles';
import { PriceUnitStyle } from './AddPage.styles';

import {Checkbox, FormControlLabel, FormGroup, MenuItem} from "@mui/material";

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

                    <div className="CityFrame">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={pickupOnlyInCity}
                                        onChange={(e) => setPickupOnlyInCity(e.target.checked)}
                                        className="CityCheckbox"
                                    />
                                }
                                label="Odbiór jest możliwy tylko w wybranym mieście"
                                className="CityCheckboxLabel"
                            />
                        </FormGroup>

                        <TextField
                            select
                            label={
                                <>
                                    Miasto&nbsp;
                                    <span
                                        className="material-symbols-outlined CityInfoIcon"
                                        title="Wybierz miasto, w którym możliwy jest odbiór."
                                    >
                                        info
                                  </span>
                                </>
                            }
                            value={selectedCity}
                            onChange={(e) => setSelectedCity(e.target.value)}
                            size="small"
                            className="CitySelect"
                            disabled={!pickupOnlyInCity}
                            InputLabelProps={{ shrink: true }}
                        >
                            <MenuItem value="Wrocław">Wrocław</MenuItem>
                            <MenuItem value="Kraków">Kraków</MenuItem>
                        </TextField>
                    </div>

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

export default AddPage;