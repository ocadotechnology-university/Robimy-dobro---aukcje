import Stack from "@mui/material/Stack";
import ControlledCheckbox from "../common/ControlledCheckbox";
import CitySelectField from "../common/CitySelectField";
import React from "react";

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

export default CitySection;