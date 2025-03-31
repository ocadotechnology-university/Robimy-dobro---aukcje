import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import {Container, Divider, IconButton, Stack, Toolbar} from '@mui/material';
import HomeIcon from "@mui/icons-material/Home";
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import { shadows } from '@mui/system';

// Change to theme colors
const buttonColor = "rgba(236, 142, 6, 1.0)";

function NavBar() {
    return (
        <AppBar position="sticky" elevation={4} sx={{backgroundColor: "white"}}>
            <Container maxWidth="xl">
                <Toolbar disableGutters>

                    {/*Middle Sizing*/}
                    <Stack flexGrow={1} direction="row" spacing={2} sx={{display: {xs:"none", sm:"flex", md:"flex"}}}>
                        {/*Logo*/}
                        <Box flexGrow={0}>
                            <Typography fontSize="15px" color="black" fontWeight="bold"
                                        fontFamily="Inter">
                                <Stack sx={{cursor: "pointer"}} direction="row" spacing={1} alignItems="center">
                                    <HomeIcon sx={{
                                        width: 36.5,
                                        height: 36.5,
                                        color: buttonColor}}/>
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

                        {/*Button*/}
                        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
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

                        {/*Account*/}
                        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar sx={{width: 36.5, height: 36.5}}></Avatar>
                        </Box>
                    </Stack>

                    {/*Small Sizing*/}
                    <Stack flexGrow={1} direction="row" spacing={2} sx={{display: {xs:"flex", sm:"none", md:"none"}}}>
                        {/*Logo*/}
                        <Box flexGrow={0} sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <HomeIcon sx={{width: 36.5, height: 36.5, color: buttonColor, cursor: "pointer"}}/>
                        </Box>

                        <Box flexGrow={1}></Box>

                        {/*Button*/}
                        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <IconButton
                                    sx={{
                                        width: 36.5,
                                        height: 36.5,
                                        borderRadius: "45px",
                                        backgroundColor: buttonColor,
                                        fontWeight: 600,
                                        textTransform: "none",
                                        padding: "none"
                                    }}
                            >
                                <AddOutlinedIcon fontSize="medium" sx={{color:"white"}}/>
                            </IconButton>
                        </Box>

                        {/*Account*/}
                        <Box sx={{display:'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar sx={{width: 36.5, height: 36.5}}></Avatar>
                        </Box>
                    </Stack>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;
