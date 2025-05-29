import * as React from 'react';
import {
    AppBar,
    Avatar,
    Box,
    Container,
    Divider,
    Stack,
    Toolbar,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Link} from 'react-router-dom';
import {AvatarStyle, CenteredBox} from "./NavBar.styles";
import logoImage from "../../image/logo.png";
import NavBarButton from "./NavBarButton";

const Account = () => (
    <CenteredBox>
        <Avatar sx={AvatarStyle}/>
    </CenteredBox>
);

const LogoSmall = () => (
    <CenteredBox flexGrow={0}>
        <img src={logoImage} alt="logo" style={{height: 50}}/>
    </CenteredBox>
);

const LogoMedium = () => (
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

const PlaceHolder = () => <Box flexGrow={1}/>;

const NavBar = () => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    const getLogo = () => {
        if (isSmallScreen) return <LogoSmall/>;
        if (isMediumScreen) return <LogoMedium/>;
        return <LogoMedium/>;
    }
    return (
        <AppBar position="sticky" elevation={4} sx={{backgroundColor: "white", width: "100%"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack flexGrow={1} direction="row" spacing={2} alignItems="center">
                        <Link to="home" style={{textDecoration: 'none'}}>
                            {getLogo()}
                        </Link>
                        <PlaceHolder/>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <NavBarButton label="Wszystkie aukcje" link="/auctions"/>
                            <NavBarButton label="Dodaj aukcję" link="/add"/>
                            <NavBarButton label="Jak to działa?" />
                        </Stack>
                        <Account/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
