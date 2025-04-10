import { styled } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { LinkProps } from 'react-router-dom';

type ButtonLinkProps = ButtonProps & LinkProps;

export const HomeImageStyle = {
    width: {
        xs: '30%',
        sm: '30%',
        md: '35% ',
        lg: '55%',
    },
    marginTop: {
        xs: '3vmin',
        sm: '3vmin',
        md: '4vmin',
        lg: '7vmin',
    }
};

export const HomeButton = styled(Button)<ButtonLinkProps>(({ theme }) => ({
    borderRadius: "45px",
    borderColor: "black",
    color: "black",
    borderWidth: "1px",
    padding: "4px 15px",
    fontWeight: 550,
    borderStyle: "solid",
    textTransform: "none",
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: "white",
    },
    fontSize: '9px',
    [theme.breakpoints.up('xs')]: {
        fontSize: '9px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '11px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '13px',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '17px',
    },
}));

export const HomeTextStyle = {
    marginBottom: "2vmin",
    fontSize: {
        xs: '10px',
        sm: '12px',
        md: '14px',
        lg: '18px',
    },
    textAlign: 'left',
    width: "100%"
};

export const HomeTextStyleSmallerMargin = {
    marginBottom: "1vmin",
    fontSize: {
        xs: '10px',
        sm: '12px',
        md: '14px',
        lg: '18px',
    },
    textAlign: 'left',
    width: "100%"
};

export const HomeHeadersStyle = {
    fontWeight: "550",
    marginBottom: "1.5vmin",
    fontSize: {
        xs: '14px',
        sm: '17px',
        md: '19px',
        lg: '21px',
    }
};
