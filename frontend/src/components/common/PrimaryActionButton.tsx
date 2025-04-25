import React from 'react';
import Button from '@mui/material/Button';
import {useTheme, Theme} from '@mui/material/styles';

type PrimaryActionButtonProps = {
    label: string;
    onClick: () => void;
};

const primaryButtonStyle = (theme: Theme) => ({
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    backgroundColor: theme.palette.primary.main,
    color: 'white',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
    px: 2,
    py: 0.5,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
    },
});

const PrimaryActionButton = ({label, onClick}: PrimaryActionButtonProps) => {
    const theme = useTheme();

    return (
        <Button variant="contained" onClick={onClick} sx={primaryButtonStyle(theme)}>
            {label}
        </Button>
    );
};

export default PrimaryActionButton;
