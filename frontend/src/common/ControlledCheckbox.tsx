import React from 'react';
import { Checkbox, FormControlLabel } from '@mui/material';
import { SxProps, Theme } from '@mui/material/styles';

type ControlledCheckboxProps = {
    checked: boolean;
    onChange: (value: boolean) => void;
    label: string;
};

const checkboxStyle: SxProps<Theme> = {
    color: '#666',
    backgroundColor: 'white',
    borderRadius: '4px',
    py: 0.1,
    px: 0.1,
    '&.Mui-checked': {
        color: '#666',
        backgroundColor: 'white',
    },
};

const formControlLabelStyle: SxProps<Theme> = {
    width: 'fit-content',
    '& .MuiFormControlLabel-label': {
        fontSize: '15px',
    },
};

const ControlledCheckbox: React.FC<ControlledCheckboxProps> = ({
                                                                   checked,
                                                                   onChange,
                                                                   label,
                                                               }) => {
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
