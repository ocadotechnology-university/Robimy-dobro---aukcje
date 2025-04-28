import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type PriceTextFieldProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceTextField = ({price, setPrice}: PriceTextFieldProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(',', '.');

        if (/^\d*\.?\d{0,2}$/.test(value) || value === '') {
            setPrice(value);
        }
    };

    return (
        <TextField
            label="Cena wywoławcza"
            variant="outlined"
            fullWidth
            size="small"
            type="text"
            value={price}
            onChange={handleChange}
            InputLabelProps={{shrink: true}}
            inputProps={{min: 0}}
            InputProps={{
                endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
        />
    );
};

export default PriceTextField;
