import React from 'react';
import {TextField, MenuItem, Box} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

type CitySelectFieldProps = {
    selectedDate: string;
    setSelectedDate: (value: string) => void;
    disabled?: boolean;
    options: string[];
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

const DateSelectField = ({
                             selectedDate,
                             setSelectedDate,
                             disabled = false,
                             options,
                         }: CitySelectFieldProps) => {
    return (
        <TextField
            select
            label={
                <Box component="span" sx={labelWrapperStyle}>
                    Miasto
                    <InfoOutlinedIcon
                        fontSize="small"
                        titleAccess="Wybierz dzień, w którym ma się odbyć licytacja."
                        sx={{cursor: 'help'}}
                    />
                </Box>
            }
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            size="small"
            disabled={disabled}
            InputLabelProps={{shrink: true}}
            sx={selectFieldStyle}
        >
            {options.map((date) => (
                <MenuItem key={date} value={date}>
                    {date}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DateSelectField;