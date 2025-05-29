import React from 'react';
import {Button} from '@mui/material';
import {Link} from 'react-router-dom';

type NavBarButtonProps = {
    label: string;
    link?: string;
};

const NavBarButtonStyle = {
    textTransform: 'none',
    color: 'black',
    fontWeight: 500,
    fontSize: '0.9rem',
    '&:hover': {
        backgroundColor: 'transparent',
        color: 'secondary.dark',
    },
};

const NavBarButton = ({label, link}: NavBarButtonProps) => {
    return (
        <Button
            component={link ? Link : 'button'}
            to={link}
            sx={NavBarButtonStyle}
            disableRipple
        >
            {label}
        </Button>
    );
};

export default NavBarButton;
