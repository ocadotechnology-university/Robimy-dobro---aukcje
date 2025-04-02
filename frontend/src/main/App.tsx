import React, {useEffect, useState} from 'react';
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import Header from "../components/NavBar/NavBar";
import img1 from "../image/image3.jpg";
import img2 from "../image/image4.jpg";
import Auth from "../components/GoogleLogin/Auth";
import Home from "../components/HomePage/HomePage";
import AddAuction from "../components/AddPage/AddPage";
import {Box, Container, Stack, useMediaQuery, useTheme} from "@mui/material";
import Typography from "@mui/material/Typography";
import {HomeHeadersStyle, HomeTextStyle} from "../components/HomePage/HomePage.styles";

const LeftPanel = ({isLarge}: { isLarge: boolean }) => {
    if (!isLarge) return null;

    return (
        <Box height="100%">
            <img src={img2} alt="Left image"
                 style={{height: '100%', objectFit: 'cover', display: 'block', overflow: "hidden"}}/>
        </Box>
    );
}

const MiddlePanel =({isLarge}: { isLarge: boolean }) => {
    return(
        <Box height="100%" sx={{minWidth: isLarge ? '1200px' : '100%'}}>
            <BrowserRouter>
                <Header/>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth"/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/add" element={<AddAuction/>}/>
                </Routes>
            </BrowserRouter>
        </Box>
    );
}

const RightPanel = ({isLarge}: { isLarge: boolean }) => {
    if (!isLarge) return null;

    return (
        <Box height="100%">
            <img src={img1} alt="Left image"
                 style={{height: '100%', objectFit: 'cover', display: 'block', overflow: "hidden"}}/>
        </Box>
    );
}

function App() {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <Container disableGutters sx={{minWidth: '100%', height: '100%'}}>
            <Stack direction="row" justifyContent="center" sx={{height: "100%"}}>
                <LeftPanel isLarge={isLarge}/>
                <MiddlePanel isLarge={isLarge}/>
                <RightPanel isLarge={isLarge}/>
            </Stack>
        </Container>
    );
}

export default App;