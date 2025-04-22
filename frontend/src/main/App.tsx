import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import Header from "../components/NavBar/NavBar";
import template from '../image/template.png';
import Auth from "../components/GoogleLogin/Auth";
import Home from "../components/HomePage/HomePage";
import AddAuction from "../components/AddPage/AddPage";
import Auctions from "../components/AuctionPage/AuctionPage"
import {QueryClient} from '@tanstack/react-query';
import {Box, Container} from "@mui/material";

const Background = () => {
    return <Box
        sx={{
            position: 'fixed',
            top: 0,
            left: '50%',
            width: '100vw',
            height: '100%',
            transform: 'translateX(-50%)',
            backgroundImage: `url(${template})`,
            backgroundRepeat: 'repeat',
            backgroundPosition: 'center',
            backgroundSize: 'auto',
            zIndex: -1,
            pointerEvents: 'none',
        }}
    />
}

function App() {
    const queryClient = new QueryClient();
    const location = useLocation();
    const isAuthPage = location.pathname === "/auth";

    return (
        <Box
            sx={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden',
            }}
        >
            <Background/>
            {/*Main content goes inside the container*/}
            <Container maxWidth="lg" disableGutters sx={{ bgcolor: 'white', minHeight: '100vh'}}>
                {!isAuthPage && <Header/>}
                <Routes>
                    <Route path="/" element={<Navigate to="/auth"/>}/>
                    <Route path="/auth" element={<Auth/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/add" element={<AddAuction/>}/>
                    <Route path="/auctions" element={<Auctions/>}/>
                </Routes>
            </Container>
        </Box>
    );
}

export default App;