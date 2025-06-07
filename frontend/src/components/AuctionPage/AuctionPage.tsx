import React, {useState} from "react";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";
import {useGetAuctions} from '../../hooks/useGetAuctions';
import {AuctionFilters} from "../../services/fetchAuctions";

const AuctionPage = () => {

    const [auctionFilters, setAuctionFilters] = useState<AuctionFilters>({
        statuses: ["INCOMPLETE"],
        myAuctions: false,
        followed: false,
        dates: ["23-11-2025"],
    });

    const {data: auctions = []} = useGetAuctions(auctionFilters);

    console.log(auctionFilters);

    return (
            <Container>
                <Stack direction="row" justifyContent="space-between" gap={2} mt={2}>
                    <Filters aucfilters={auctionFilters} setAucFilters={setAuctionFilters}/>
                    <AuctionsList auctions={auctions}/>
                </Stack>
            </Container>
    );
}

export default AuctionPage;