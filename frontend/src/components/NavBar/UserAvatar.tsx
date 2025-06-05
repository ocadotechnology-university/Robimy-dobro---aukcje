import {CenteredBox} from "../common/CenteredBox";
import {Avatar, IconButton, Menu} from "@mui/material";
import React, {useState} from "react";
import MenuItem from "@mui/material/MenuItem";
import {useAuth} from "../../hooks/AuthProvider";

const AvatarStyle = {
    width: 36.5,
    height: 36.5
}

export const UserAvatar = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const {logout, profileImageURL} = useAuth();

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <CenteredBox>
            <IconButton onClick={handleClick} size="small">
                <Avatar key={profileImageURL} sx={AvatarStyle} src={profileImageURL ?? undefined}/>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
                transformOrigin={{vertical: 'top', horizontal: 'right'}}
            >
                <MenuItem onClick={() => {
                    handleClose();
                    logout();
                }}>Wyloguj</MenuItem>
            </Menu>
        </CenteredBox>
    );
};