import React from 'react';
import Button from '@mui/material/Button';
import {useTheme, Theme} from '@mui/material/styles';

type UpdateActionButtonProps = {
    label: string;
    onClick: () => void;
};

const UpdateButtonSaveStyle = (theme: Theme) => ({
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    px: 2,
    py: 0.5,
    width: '25%',
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    }
});

const UpdateButtonCancelStyle = (theme: Theme) => ({
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: "white",
    color: 'black',
    px: 2,
    py: 0.5,
    width: '15%',
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    }
});

export const UpdateActionButtonSave = ({label, onClick}: UpdateActionButtonProps) => {
    const theme = useTheme();

    return (
        <Button variant="contained" onClick={onClick} sx={UpdateButtonSaveStyle(theme)}>
            {label}
        </Button>
    );
};

export const UpdateActionButtonCancel = ({label, onClick}: UpdateActionButtonProps) => {
    const theme = useTheme();

    return (
        <Button variant="outlined" color="inherit" onClick={onClick} sx={UpdateButtonCancelStyle(theme)}>
            {label}
        </Button>
    );
};

// export default UpdateActionButtonSave;
