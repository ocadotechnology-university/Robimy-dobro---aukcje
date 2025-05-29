import {CenteredBox} from "../common/CenteredBox";
import logoImage from "../../image/logo.png";
import {Box, Divider, Stack, Typography, useMediaQuery, useTheme} from "@mui/material";
import React from "react";

export const LogoSmall = () => (
    <CenteredBox flexGrow={0}>
        <img src={logoImage} alt="logo" style={{height: 50}}/>
    </CenteredBox>
);

export const LogoMedium = () => (
    <Box flexGrow={0}>
        <Stack sx={{cursor: "pointer"}} direction="row" spacing={1} alignItems="center">
            <img src={logoImage} alt="logo" style={{height: 50}}/>
            <Stack direction="column">
                <Typography fontSize="15px" color="black" fontWeight="bold" fontFamily="Inter">Robimy</Typography>
                <Typography fontSize="15px" color="black" fontWeight="bold" fontFamily="Inter">Dobro</Typography>
            </Stack>
            <Divider sx={{borderColor: "primary"}} orientation="vertical" variant="middle" flexItem/>
            <Typography fontSize="15px" color="black" fontWeight="bold" fontFamily="Inter">2025</Typography>
        </Stack>
    </Box>
);

export const LogoSwitcher = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    if (isSmallScreen) return <LogoSmall/>;
    if (isMediumScreen) return <LogoMedium/>;
    return <LogoMedium/>;
}