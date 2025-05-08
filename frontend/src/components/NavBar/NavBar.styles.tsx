import Box from "@mui/material/Box";
import {styled} from "@mui/material";
import IconButton, {IconButtonProps} from '@mui/material/IconButton';
import {LinkProps} from 'react-router-dom';
import {Theme} from "@mui/material/styles";

type IconButtonLinkProps = IconButtonProps & LinkProps;

export const CenteredBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const IconButtonComponent = styled(IconButton)<IconButtonLinkProps>(({theme}) => ({
    width: 36.5,
    height: 36.5,
    borderRadius: "45px",
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 600,
    textTransform: "none",
    padding: "none",
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark
    },
}));

export const AvatarStyle = {
    width: 36.5,
    height: 36.5
}

export const ButtonStyle = (theme: Theme) => ({
    borderRadius: "45px",
    backgroundColor: theme.palette.secondary.main,
    fontWeight: 600,
    textTransform: "none",
    '&:hover': {
        backgroundColor: theme.palette.secondary.dark
    },
})