import React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import EventIcon from '@mui/icons-material/Event';
import Stack from '@mui/material/Stack';

type DateToggleGroupProps = {
    selectedDate: string;
    setSelectedDate: (value: string) => void;
    disabled?: boolean;
    dates: string[];
};

const dateToggleButtonStyle = (selected: boolean) => ({
    borderRadius: '16px',
    textTransform: 'none',
    fontSize: '13px',
    fontWeight: selected ? 'bold' : 'normal',
    display: 'flex',
    alignItems: 'center',
    gap: 0.5,
    px: 1,
    py: 0.5,
});

const DateToggleGroup = ({
                             selectedDate,
                             setSelectedDate,
                             disabled = false,
                             dates,
                         }: DateToggleGroupProps) => {
    return (
        <Stack direction="row" spacing={1}>
            {dates.map((label) => (
                <ToggleButton
                    key={label}
                    value={label}
                    selected={selectedDate === label}
                    onChange={() => setSelectedDate(label)}
                    disabled={disabled}
                    size="small"
                    sx={dateToggleButtonStyle(selectedDate === label)}
                >
                    <EventIcon fontSize="small"/>
                    {label}
                </ToggleButton>
            ))}
        </Stack>
    );
};

export default DateToggleGroup;
