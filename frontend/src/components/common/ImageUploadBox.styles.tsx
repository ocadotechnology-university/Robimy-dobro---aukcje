import Button from "@mui/material/Button";
import theme from "../../theme/theme";
import React from "react";

export const boxStyleBeforeUpload = {
    alignSelf: 'center',
    width: 200,
    height: 120,
    border: '2px solid #aaa',
    borderRadius: 2,
    backgroundColor: '#ddd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    '&:hover': {
        backgroundColor: '#f0f0f0',
    },
};

export const modalStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backdropFilter: 'blur(10px)'
};

export const imageInModalStyle: React.CSSProperties = {
    objectFit: 'contain',
    maxWidth: '90vw',
    maxHeight: '80vh',
    objectPosition: 'center',
};

export const imageInFormStyle: React.CSSProperties = {
    boxShadow: '0 0 3px 3px rgb(205, 205, 205)',
    maxWidth: '250px',
};

export const imageButtonsStyle = {
    [theme.breakpoints.up('xs')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '14px',
    }
}