import React from 'react';
import {AppBar, Box, Container, Stack, Toolbar} from "@mui/material";
import {Link} from 'react-router-dom';
import NavBarButton from "./NavBarButton";
import {LogoSwitcher} from "./NavBarLogo";
import {UserAvatar} from "./UserAvatar";

const NavBar = () => {
    return (
        <AppBar position="sticky" elevation={4} sx={{backgroundColor: "white", width: "100%"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Stack flexGrow={1} direction="row" spacing={2} alignItems="center">
                        <Link to="home" style={{textDecoration: 'none'}}>
                            <LogoSwitcher/>
                        </Link>
                        <Box flexGrow={1}/>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <NavBarButton label="Wszystkie aukcje" link="/auctions"/>
                            <NavBarButton label="Dodaj aukcję" link="/add"/>
                            <NavBarButton label="Jak to działa?"/>
                        </Stack>
                        <UserAvatar/>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
