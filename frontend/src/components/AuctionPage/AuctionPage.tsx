import React, {useState} from "react";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";
import {useGetAuctions} from '../../hooks/useGetAuctions';
import {AuctionFilters} from "../../services/fetchAuctions";
import {useLocation} from 'react-router-dom';

const AuctionPage = () => {
    const location = useLocation();
    const dateFromState = location.state?.dateFilter;

    const [auctionFilters, setAuctionFilters] = useState<AuctionFilters>({
        statuses: ["INCOMPLETE"],
        myAuctions: false,
        followed: false,
        dates: dateFromState ? [dateFromState] : [],
    });

    const {data: auctions = []} = useGetAuctions(auctionFilters);

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" gap={2} mt={2}>
                <Filters
                    aucfilters={auctionFilters}
                    setAucFilters={setAuctionFilters}
                    auctionsAmount={auctions.length}
                    initialSelectedDate={dateFromState}
                />
                <AuctionsList auctions={auctions}/>
            </Stack>
        </Container>
    );
}

export default AuctionPage;