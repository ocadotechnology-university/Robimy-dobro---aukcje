import React from 'react';
import {TextField, MenuItem, Box} from '@mui/material';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import {useAuctionDates} from "../../contexts/AuctionDatesContext";

type CitySelectFieldProps = {
    selectedDate: string;
    setSelectedDate: (value: string) => void;
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

const formatDateLabel = (date: Date) =>
    `${date.getDate()} ${date.toLocaleString('pl-PL', {month: 'long'})}`;

const DateSelectField = ({
                             selectedDate,
                             setSelectedDate,
                             disabled = false,
                         }: CitySelectFieldProps) => {
    const {dates, loading} = useAuctionDates();
    const options = dates.map(formatDateLabel);

    return (
        <TextField
            select
            label={
                <Box component="span" sx={labelWrapperStyle}>
                    Data licytacji
                    <InfoOutlinedIcon
                        fontSize="small"
                        titleAccess="Wybierz dzień, w którym ma się odbyć licytacja"
                        sx={{cursor: 'help'}}
                    />
                </Box>
            }
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
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
            {options.map((date) => (
                <MenuItem key={date} value={date}>
                    {date}
                </MenuItem>
            ))}
        </TextField>
    );
};

export default DateSelectField;