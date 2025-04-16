import React, {useState} from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";
import {useGetAuctions} from '../../hooks/useGetAuctions';
import {AuctionFilters} from "../../services/fetchAuctions";

const AuctionPage = () => {

    const [auctionFilters, setAuctionFilters] = useState<AuctionFilters>({
        statuses: ["No date"],
        myAuctions: true,
        followed: false,
        dates: ["2025-04-09", "2025-04-10"],
    });

    const { data:  auctions = [] } = useGetAuctions(auctionFilters);

    return (
        <React.Fragment>
            <CssBaseline />
            <Container sx={{ backgroundColor:'white' }}>
                <Stack direction="row" justifyContent="space-between" gap={2} mt={2}>
                    <Filters aucfilters={auctionFilters} setAucFilters={setAuctionFilters} />
                    <AuctionsList auctions={ auctions }/>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default AuctionPage;