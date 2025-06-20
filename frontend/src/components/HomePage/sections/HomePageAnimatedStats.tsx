import React from "react";
import StatsCard from "../statsCard/StatsCard";
import StatsCardStack from "../statsCard/StatsCardStack";
import PaidIcon from '@mui/icons-material/Paid';
import PeopleIcon from '@mui/icons-material/People';
import ArticleIcon from '@mui/icons-material/Article';
import {useHomePageContent} from "../../../hooks/useHomePageContent";

const HomePageAnimatedStats = () => {
    const {data, loading, error} = useHomePageContent();

    if (loading || !data) return null;
    if (error) return <div>Błąd: {error}</div>;

    const {funds, auctions, supliers} = data.stats;

    return (
        <StatsCardStack title="Nasza Wspólna Siła w Liczbach">
            <StatsCard
                icon={<PaidIcon fontSize="large"/>}
                value={funds}
                suffix="+ PLN"
                description="Zebranych środków z licytacji"
                animate
                useCounter
                iconColor="primary"
                animationVariant="fade"
            />
            <StatsCard
                icon={<ArticleIcon fontSize="large"/>}
                value={auctions}
                suffix="+"
                description="Aukcji"
                animate
                useCounter
                iconColor="primary"
                animationVariant="fade"
            />
            <StatsCard
                icon={<PeopleIcon fontSize="large"/>}
                value={supliers}
                suffix="+"
                description="Wystawców aukcji"
                animate
                useCounter
                iconColor="primary"
                animationVariant="fade"
            />
        </StatsCardStack>
    );
};

export default HomePageAnimatedStats;