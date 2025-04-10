import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { LinkProps } from 'react-router-dom';
import HomeIcon from "@mui/icons-material/Home";

export const ButtonColor = "rgba(236, 142, 6, 1.0)";
type IconButtonLinkProps = IconButtonProps & LinkProps;

export const CenteredBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

export const HomeIconComponent = styled(HomeIcon)({
    width: 36.5,
    height: 36.5,
    color: ButtonColor,
    cursor: "pointer"
});

export const IconButtonComponent = styled(IconButton)<IconButtonLinkProps>({
    width: 36.5,
    height: 36.5,
    borderRadius: "45px",
    backgroundColor: ButtonColor,
    fontWeight: 600,
    textTransform: "none",
    padding: "none"
});

export const AvatarStyle = {
    width: 36.5,
    height: 36.5
}

export const ButtonStyle = {
    borderRadius: "45px",
    backgroundColor: ButtonColor,
    fontWeight: 600,
    textTransform: "none"
}