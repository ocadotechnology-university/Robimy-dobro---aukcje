import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Divider, Paper, Stack, styled} from '@mui/material';
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
        <AppBar position="static">
            <Stack
                flexShrink={1}
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    maxHeight: "6%",
                    minHeight: 50,
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(214, 214, 200, 0.5)",
                    position: "relative",
                    zIndex: 10,
                    px: 2
                }}
            >
                {/*<Stack flexShrink={1} direction="row" alignItems="center" justifyContent="flex-start" spacing={0.5} sx={{ cursor: "pointer" }}>
                    <HomeIcon sx={{color: "rgba(236, 142, 6, 1)"}} fontSize="large"/>

                    <Typography>
                        <Stack Array>

                        </Stack>
                    </Typography>

                    <Stack spacing={-0.7}>
                        <Typography fontSize="14px" color="black" fontWeight={750}>Robimy</Typography>
                        <Typography fontSize="14px" color="black" fontWeight={750} mt={0.5}>Dobro</Typography>
                    </Stack>
                    <Typography fontSize="25px" color="rgba(236, 142, 6, 1.0)">|</Typography>
                    <Typography fontSize="14px" color="black" fontWeight={750}>2025</Typography>
                </Stack>*/}


                {/*Logo*/}
                <Typography sx={{ cursor: "pointer" }} fontSize="15px" color="black" fontWeight="bold" fontFamily="Inter">
                    <Stack direction="row" spacing={1} alignItems="center" >
                        <HomeIcon fontSize="large" sx={{color:buttonColor}} />
                        <Stack direction="column">
                            <Box>Robimy</Box>
                            <Box>Dobro</Box>
                        </Stack>
                        <Divider sx={{borderColor:buttonColor}} orientation="vertical" variant="middle" flexItem/>
                        <Box>2025</Box>
                    </Stack>
                </Typography>

                <Box mr={2}>
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
                </Box>
            </Stack>
        </AppBar>
    );
}

export default NavBar;
