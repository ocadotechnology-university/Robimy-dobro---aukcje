import React, {useState} from "react";
import {Container, Box, Typography, Stack} from '@mui/material';
import Filters from './Filters';
import AuctionsList from "./AuctionsList";
import {useGetAuctions} from '../../hooks/useGetAuctions';
import {AuctionFilters} from "../../services/fetchAuctions";
import {useLocation} from 'react-router-dom';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const AuctionPage = () => {
    const location = useLocation();
    const dateFromState = location.state?.dateFilter;

    const [auctionFilters, setAuctionFilters] = useState<AuctionFilters>({
        statuses: ["INCOMPLETE"],
        myAuctions: false,
        followed: false,
        dates: dateFromState ? [dateFromState] : [],
    });

    const {data: auctions = [], isLoading} = useGetAuctions(auctionFilters);

    return (
        <Container>
            <Stack direction="row" justifyContent="space-between" gap={2} mt={2}>
                <Filters
                    aucfilters={auctionFilters}
                    setAucFilters={setAuctionFilters}
                    auctionsAmount={auctions.length}
                    initialSelectedDate={dateFromState}
                />

                {auctions.length === 0 ? (
                    <Box
                        display="flex"
                        alignSelf="flex-start"
                        alignItems="center"
                        justifyContent="center"
                        width="100%"
                        p={3}
                    >
                        <Typography variant="h6" color="text.secondary">
                            Brak wyników
                        </Typography>
                        <SearchOffIcon sx={{fontSize: 25, color: 'text.secondary', pl: 1}}/>
                    </Box>
                ) : (
                    <AuctionsList auctions={auctions} isLoading={isLoading}/>
                )}
            </Stack>
        </Container>
    );
}

export default AuctionPage;