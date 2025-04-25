import React from 'react';
import Button from '@mui/material/Button';

type OutlinedActionButtonProps = {
    label: string;
    onClick: () => void;
};

const buttonStyle = {
    borderRadius: '45px',
    fontWeight: 600,
    textTransform: 'none',
    px: 1,
    py: 0.5,
    '&:hover': {
        backgroundColor: 'rgba(0, 0, 0, 0.1)'
    },
};

const OutlinedActionButton = ({label, onClick}: OutlinedActionButtonProps) => {
    return (
        <Button
            variant="outlined"
            color="inherit"
            sx={buttonStyle}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};

export default OutlinedActionButton;
