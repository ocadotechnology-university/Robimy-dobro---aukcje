import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Container, Divider, Stack, Toolbar} from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";

// Change to constant colors
const buttonColor = "rgba(236, 142, 6, 1.0)";

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Moje Aukcje', 'Wyloguj'];

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position="static" sx={{backgroundColor: "white"}}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    {/*Logo*/}
                    <Box flexGrow={0}>
                        <Typography fontSize="15px" color="black" fontWeight="bold"
                                    fontFamily="Inter">
                            <Stack sx={{cursor: "pointer"}} direction="row" spacing={1} alignItems="center">
                                <HomeIcon fontSize="large" sx={{color: buttonColor}}/>
                                <Stack direction="column">
                                    <Box>Robimy</Box>
                                    <Box>Dobro</Box>
                                </Stack>
                                <Divider sx={{borderColor: buttonColor}} orientation="vertical" variant="middle"
                                         flexItem/>
                                <Box>2025</Box>
                            </Stack>
                        </Typography>
                    </Box>

                    <Box flexGrow={1}></Box>

                    {/*Przycisk*/}
                    <Box flexGrow={0}>
                        <Button variant="contained"
                            sx={{
                                borderRadius: "45px",
                                backgroundColor: buttonColor,
                                fontWeight: 600,
                                textTransform: "none"
                            }}
                        >
                            Dodaj aukcję
                        </Button>
                    </Box>


                    {/*<Box mr={2}>
                        <Button
                            variant="contained"
                            sx={{
                                borderRadius: "45px",
                                backgroundColor: "rgba(236, 142, 6, 1)",
                                fontWeight: 600,
                                textTransform: "none",
                                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
                                '&:hover': {backgroundColor: "rgba(236, 142, 6, 1)"}
                            }}
                        >
                            Dodaj aukcję
                        </Button>
                    </Box>

                    <Box>
                        <Avatar/>
                    </Box>*/}
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
