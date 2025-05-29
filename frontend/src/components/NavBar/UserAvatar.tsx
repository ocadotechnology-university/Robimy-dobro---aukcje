import {CenteredBox} from "../common/CenteredBox";
import {Avatar} from "@mui/material";
import React from "react";

const AvatarStyle = {
    width: 36.5,
    height: 36.5
}

export const UserAvatar = () => (
    <CenteredBox>
        <Avatar sx={AvatarStyle}/>
    </CenteredBox>
);