import React from "react";
import {Stack} from "@mui/material";
import StatsCard from "./StatsCard";
import PeopleIcon from '@mui/icons-material/People';
import PaidIcon from '@mui/icons-material/Paid';
import ArticleIcon from '@mui/icons-material/Article';

const HomePageStats = () => {
    return (
        <Stack direction="row" alignItems="center" spacing={2.5} mt={3}>
            <StatsCard
                icon={<PaidIcon fontSize="large"/>}
                title="90 000+ PLN"
                description="Zebranych środków z licytacji"
            />
            <StatsCard
                icon={<ArticleIcon fontSize="large"/>}
                title="200+"
                description="Aukcji"
            />
            <StatsCard
                icon={<PeopleIcon fontSize="large"/>}
                title="80+"
                description="Wystawców aukcji"
            />
        </Stack>
    );
};

export default HomePageStats;