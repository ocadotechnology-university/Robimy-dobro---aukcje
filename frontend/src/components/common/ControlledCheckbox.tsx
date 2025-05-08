import React from 'react';
import {Checkbox, FormControlLabel} from '@mui/material';
import {Theme} from '@mui/material/styles';

type ControlledCheckboxProps = {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
};

const checkboxStyle = (theme: Theme) => ({
    color: theme.palette.grey[600],
    backgroundColor: theme.palette.common.white,
    borderRadius: '4px',
    py: 0.1,
    px: 0.1,
    '&.Mui-checked': {
        color: theme.palette.grey[600],
        backgroundColor: theme.palette.common.white,
    },
});

const formControlLabelStyle = {
    width: 'fit-content',
    '& .MuiFormControlLabel-label': {
        fontSize: '15px',
    },
};

const ControlledCheckbox = ({checked, onChange, label}: ControlledCheckboxProps) => {
    return (
        <FormControlLabel
            control={
                <Checkbox
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                    sx={checkboxStyle}
                />
            }
            label={label}
            sx={formControlLabelStyle}
        />
    );
};

export default ControlledCheckbox;
