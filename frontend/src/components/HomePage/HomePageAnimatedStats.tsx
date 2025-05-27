import React from "react";
import StatsCard from "./StatsCard";
import StatsCardStack from "./StatsCardStack";
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';

const HomePageAnimatedStats = () => {
    return (
        <StatsCardStack title="Nasza Wspólna Siła w Liczbach">
            <StatsCard
                icon={<PaidIcon fontSize="large"/>}
                value={90000}
                suffix="+ PLN"
                description="Zebranych środków z licytacji"
                animate
                useCounter
                iconColor="primary"
            />
            <StatsCard
                icon={<ArticleIcon fontSize="large"/>}
                value={200}
                suffix="+"
                description="Aukcji"
                animate
                useCounter
                iconColor="primary"
            />
            <StatsCard
                icon={<PeopleIcon fontSize="large"/>}
                value={80}
                suffix="+"
                description="Wystawców aukcji"
                animate
                useCounter
                iconColor="primary"
            />
        </StatsCardStack>
    );
};

export default HomePageAnimatedStats;