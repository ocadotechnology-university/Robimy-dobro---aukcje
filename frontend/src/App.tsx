import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from "./components/NavBar/NavBar";
import img1 from "./image/image3.jpg";
import img2 from "./image/image4.jpg";
import Auth from "./components/GoogleLogin/Auth";
import Home from "./components/HomePage/HomePage";
import AddAuction from "./components/AddPage/AddPage";
import {Box, Container, Stack} from "@mui/material";

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container disableGutters sx={{minWidth:'100%', height:'100%'}}>
            <Stack direction="row" justifyContent="center" sx={{ height: "100%" }}>

                {windowWidth > 1500 && (
                    <Box height="100%">
                        <img src={img2} alt="Left image" style={{height: "100%", objectFit: 'cover'}} />
                    </Box>
                )}

                <Box height="100%" sx={{minWidth: windowWidth > 1500 ? '1500px' : '100%'}}>
                    <BrowserRouter >
                        <Header/>
                        <Routes>
                            <Route path="/" element={<Navigate to="/auth"/>}/>
                            <Route path="/auth" element={<Auth/>}/>
                            <Route path="/home" element={<Home/>}/>
                            <Route path="/add" element={<AddAuction/>}/>
                        </Routes>
                    </BrowserRouter>
                </Box>

                {windowWidth > 1500 && (
                    <Box height="100%">
                        <img src={img1} alt="Right image" style={{height: "100%", objectFit: 'cover'}}/>
                    </Box>
                )}
            </Stack>
        </Container>
    );
}

export default App;