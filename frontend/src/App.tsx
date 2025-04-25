import {Routes, Route, Navigate} from 'react-router-dom';
import template from './image/template.png';
import Auth from "./components/GoogleLogin/Auth";
import Home from "./components/HomePage/HomePage";
import AddAuction from "./components/AddPage/AddPage";
import Auctions from "./components/AuctionPage/AuctionPage"
import {Box} from "@mui/material";
import Root from "./Root";

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
            <Routes>
                <Route path="/auth" element={<Auth/>} />
                <Route element={<Root/>}>
                    <Route path="/" element={<Navigate to="/auth" />} />
                    <Route path="/home" element={<Home/>} />
                    <Route path="/add" element={<AddAuction/>} />
                    <Route path="/auctions" element={<Auctions/>} />
                </Route>
            </Routes>
        </Box>
    );
}

export default App;