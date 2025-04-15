import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';

type PriceTextFieldProps = {
    price: string;
    setPrice: (value: string) => void;
};

const PriceTextField: React.FC<PriceTextFieldProps> = ({ price, setPrice }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
        const input = e.currentTarget;
        const value = input.value;

        if (!value) return;

        const parts = value.split(/[.,]/);
        if (parts[1]?.length > 2) {
            input.value = `${parts[0]}.${parts[1].slice(0, 2)}`;
        }
    };


    return (
        <TextField
            label="Cena wywoławcza"
            variant="outlined"
            fullWidth
            size="small"
            type="number"
            value={price}
            onChange={handleChange}
            onInput={handleInput}
            InputLabelProps={{ shrink: true }}
            inputProps={{ min: 0 }}
            InputProps={{
                endAdornment: <InputAdornment position="end">zł</InputAdornment>,
            }}
        />
    );
};

export default PriceTextField;
