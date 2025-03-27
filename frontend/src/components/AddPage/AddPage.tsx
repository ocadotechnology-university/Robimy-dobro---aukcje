import "./AddPage.css"
import React, { useState } from "react";
import { TextField, Checkbox, FormControlLabel, FormGroup, FormControl, InputLabel, Select, MenuItem, Tooltip, ToggleButton, ToggleButtonGroup} from "@mui/material";

const AddPage: React.FC = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [pickupOnlyInCity, setPickupOnlyInCity] = useState(false);
    const [selectedCity, setSelectedCity] = useState("");
    const [wantsToBeModerator, setWantsToBeModerator] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

    return (
        <main className="AddPage">
            <div className="FormContainer">
                <label className="ImageUploadFrame">
                    <header className="ImageUploadTitle">Dodaj zdjęcie</header>
                    <div className="ImageUploadBox">
                        <span className="material-symbols-outlined">upload</span>
                    </div>
                </label>

                <div className="TitleFrame">
                    <TextField
                        label="Tytuł"
                        variant="outlined"
                        fullWidth
                        value={title}
                        size={"small"}
                        onChange={(e) => setTitle(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                </div>

                <div className="PriceFrame">
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

                    />
                    <span className="PriceUnit">zł</span>
                </div>

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
            </div>
        </main>
    );
}

export default AddPage;