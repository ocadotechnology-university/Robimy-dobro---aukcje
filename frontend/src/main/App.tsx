import React, {useEffect, useState} from 'react';
import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Header from "../components/NavBar/NavBar";
import img1 from "../image/image3.jpg";
import img2 from "../image/image4.jpg";
import Auth from "../components/GoogleLogin/Auth";
import Home from "../components/HomePage/HomePage";
import AddAuction from "../components/AddPage/AddPage";
import Auctions from "../components/AuctionPage/AuctionPage"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {Box, Container, Stack, useMediaQuery, useTheme} from "@mui/material";

const LeftPanel = ({isLarge}: { isLarge: boolean }) => {
    if (!isLarge) return null;

    return (
        <Box height="100%">
            <img src={img2} alt="Left image"
                 style={{height: '100%', objectFit: 'cover', display: 'block', overflow: "hidden"}}/>
        </Box>
    );
}

const MiddlePanel =({isLarge, isAuthPage}: { isLarge: boolean, isAuthPage: boolean}) => {
    return(
        <Box height="100%" sx={{minWidth: isLarge ? '1200px' : '100%'}}>
            {/*<BrowserRouter>*/}
                {!isAuthPage && <Header/>}
                <Routes>
                    <Route path="/" element={<Navigate to="/auth"/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/add" element={<AddAuction/>}/>
                    <Route path="/auctions" element={<Auctions/>}/>
                </Routes>
            {/*</BrowserRouter>*/}
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
    const queryClient = new QueryClient();
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const theme = useTheme();
    const isLarge = useMediaQuery(theme.breakpoints.up('lg'));

    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <Container disableGutters sx={{minWidth: '100%', height: '100%'}}>
                <Stack direction="row" justifyContent="center" sx={{height: "100%"}}>
                    {!isAuthPage && <LeftPanel isLarge={isLarge}/>}
                    <MiddlePanel isLarge={isLarge} isAuthPage={isAuthPage}/>
                    {!isAuthPage && <RightPanel isLarge={isLarge}/>}
                </Stack>
            </Container>
        </QueryClientProvider>
    );
}

export default App;