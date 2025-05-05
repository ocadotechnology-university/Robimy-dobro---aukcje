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
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.common.white,
    boxShadow: '0 4px 8px ${alpha(theme.palette.common.black, 0.3)}',
    px: 2,
    py: 0.5,
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark,
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
