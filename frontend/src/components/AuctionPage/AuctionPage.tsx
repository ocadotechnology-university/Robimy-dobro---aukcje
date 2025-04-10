import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";
import {useGetAuctions} from '../../hooks/useGetAuctions';

const AuctionPage = () => {
    const { auctions, error } = useGetAuctions();

    return (
        <React.Fragment>
            <CssBaseline />
            <Container sx={{ backgroundColor:'white' }}>
                <Stack direction="row" justifyContent="space-between" gap={2} mt={2}>
                    <Filters />
                    <AuctionsList auctions={auctions} />
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default AuctionPage;