import * as React from 'react';
import {AppBar, Avatar, Box, Button, Container, Divider, IconButton, Stack, Toolbar, Typography, useMediaQuery, useTheme} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { Link } from 'react-router-dom';
import { ButtonStyle, AvatarStyle } from "./NavBar.styles";
import {CenteredBox, HomeIconComponent, IconButtonComponent} from "./NavBar.styles";

const Account = () => (
    <CenteredBox>
        <Avatar sx={AvatarStyle} />
    </CenteredBox>
);

const ButtonSmall = () => (
    <CenteredBox>
        <IconButtonComponent component={Link} to="/add">
            <AddOutlinedIcon fontSize="medium" sx={{ color: "white" }} />
        </IconButtonComponent>

    </CenteredBox>
);

const LogoSmall = () => (
    <CenteredBox flexGrow={0}>
        <HomeIconComponent />
    </CenteredBox>
);

const ButtonMedium = () => (
    <CenteredBox>
        <Button component={Link} to="/add" variant="contained" sx={ButtonStyle}>
            Dodaj aukcję
        </Button>
    </CenteredBox>
);

const LogoMedium = () => (
    <Box flexGrow={0}>
        <Typography fontSize="15px" color="black" fontWeight="bold" fontFamily="Inter">
            <Stack sx={{ cursor: "pointer" }} direction="row" spacing={1} alignItems="center">
                <HomeIconComponent />
                <Stack direction="column">
                    <Box>Robimy</Box>
                    <Box>Dobro</Box>
                </Stack>
                <Divider sx={{ borderColor: "primary" }} orientation="vertical" variant="middle" flexItem />
                <Box>2025</Box>
            </Stack>
        </Typography>
    </Box>
);

const PlaceHolder = () => <Box flexGrow={1} />;

const NavBar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    const getLogo = () =>{
        if(isSmallScreen) return <LogoSmall/>;
        if(isMediumScreen) return <LogoMedium/>;
        return <LogoMedium/>;
    }

    const getButton = () =>{
        if(isSmallScreen) return <ButtonSmall/>;
        if(isMediumScreen) return <ButtonMedium/>;
        return <ButtonMedium/>;
    }

    return (
        <AppBar position="sticky" elevation={4} sx={{backgroundColor: "white", width: "100%"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack flexGrow={1} direction="row" spacing={2} alignItems="center">
                        <Link to="home" style={{ textDecoration: 'none' }}>
                            {getLogo()}
                        </Link>
                        <PlaceHolder/>
                        {getButton()}
                        <Account/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
