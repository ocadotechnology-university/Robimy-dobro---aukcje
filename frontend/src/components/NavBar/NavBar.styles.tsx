import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { LinkProps } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

type IconButtonLinkProps = IconButtonProps & LinkProps;

export const CenteredBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const HomeIconComponent = styled(HomeIcon)(({ theme }) => ({
    width: 36.5,
    height: 36.5,
    color: theme.palette.primary.main,
    cursor: "pointer"
}));

export const IconButtonComponent = styled(IconButton)<IconButtonLinkProps>(({ theme }) => ({
    width: 36.5,
    height: 36.5,
    borderRadius: "45px",
    backgroundColor: theme.palette.primary.main,
    fontWeight: 600,
    textTransform: "none",
    padding: "none"
}));

export const AvatarStyle = {
    width: 36.5,
    height: 36.5
}

export const ButtonStyle = {
    borderRadius: "45px",
    backgroundColor: "primary",
    fontWeight: 600,
    textTransform: "none"
}