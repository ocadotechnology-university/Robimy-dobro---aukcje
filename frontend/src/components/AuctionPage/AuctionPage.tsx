import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";

const AuctionPage = () => {
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="md" sx={{ backgroundColor:'white' }}>
                <Stack direction="row" justifyContent="space-between" sx={{ p: 2 }}>
                    <Filters />
                    <AuctionsList />
                </Stack>

            </Container>
        </React.Fragment>
    );
}

export default AuctionPage;