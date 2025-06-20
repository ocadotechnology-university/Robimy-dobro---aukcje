import React from 'react';
import {TextField, MenuItem, Box} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useCities} from "../../contexts/CitiesContext";

type CitySelectFieldProps = {
    selectedCity: string;
    setSelectedCity: (value: string) => void;
    disabled?: boolean;
};

const labelWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
};

const selectFieldStyle = {
    width: '100%',
    maxWidth: 150,
};

const CitySelectField = ({
                             selectedCity,
                             setSelectedCity,
                             disabled = false,
                         }: CitySelectFieldProps) => {
    const {cities, loading} = useCities();

    return (
        <TextField
            select
            label={
                <Box component="span" sx={labelWrapperStyle}>
                    Miasto
                    <InfoOutlinedIcon
                        fontSize="small"
                        titleAccess="Wybierz miasto, w którym możliwy jest odbiór"
                        sx={{cursor: 'help'}}
                    />
                </Box>
            }
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            size="small"
            disabled={disabled || loading}
            InputLabelProps={{shrink: true}}
            sx={selectFieldStyle}
            SelectProps={{
                MenuProps: {
                    disableScrollLock: true,
                },
            }}
        >
            {cities.map((city) => (
                <MenuItem key={city} value={city}>
                    {city}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default CitySelectField;