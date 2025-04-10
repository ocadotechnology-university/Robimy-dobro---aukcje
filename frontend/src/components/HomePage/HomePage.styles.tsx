import { styled } from "@mui/material";
import Button, { ButtonProps } from '@mui/material/Button';
import { LinkProps } from 'react-router-dom';
import Typography from '@mui/material/Typography';

type ButtonLinkProps = ButtonProps & LinkProps;

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

export const HomeText = styled(Typography)(({ theme }) => ({
    marginBottom: "2vmin",
    textAlign: 'left',
    width: "100%",
    [theme.breakpoints.up('xs')]: {
        fontSize: '10px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '14px',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '18px',
    },
}));

export const HomeTextSmallerMargin = styled(Typography)(({ theme }) => ({
    marginBottom: "1vmin",
    textAlign: 'left',
    width: "100%",
    [theme.breakpoints.up('xs')]: {
        fontSize: '10px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '12px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '14px',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '18px',
    },
}));

export const HomeHeader = styled(Typography)(({ theme }) => ({
    fontWeight: "550",
    marginBottom: "1.5vmin",
    [theme.breakpoints.up('xs')]: {
        fontSize: '14px',
    },
    [theme.breakpoints.up('sm')]: {
        fontSize: '17px',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '19px',
    },
    [theme.breakpoints.up('lg')]: {
        fontSize: '21px',
    },
}));


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
