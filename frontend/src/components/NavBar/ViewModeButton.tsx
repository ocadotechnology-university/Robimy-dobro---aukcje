import React from "react";
import {IconButton, Tooltip} from "@mui/material";
import ShieldIcon from '@mui/icons-material/Shield';
import RemoveModeratorIcon from '@mui/icons-material/RemoveModerator';
import {useViewMode} from "../../contexts/ViewModeContext";

export const ViewModeButton = () => {
    const {adminViewMode, toggleViewMode} = useViewMode();

    return (
        <Tooltip title={adminViewMode ? "Widok admina" : "Widok użytkownika"}>
            <IconButton onClick={toggleViewMode} size="large" disableRipple sx={{color: '#fbc02d'}}>
                {adminViewMode ? <ShieldIcon/> : <RemoveModeratorIcon/>}
            </IconButton>
        </Tooltip>
    );
};
