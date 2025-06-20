import React from "react";
import Box from "@mui/material/Box";
import StatsCard from "../statsCard/StatsCard";
import StatsCardStack from "../statsCard/StatsCardStack";
import SzlachetnaPaczkaLogo from "../../../image/szlachetnaPaczka.svg";
import ZobaczMnieLogo from "../../../image/zobaczMnie.svg";
import {useHomePageContent} from "../../../hooks/useHomePageContent";

const HomePageAnimatedInfo = () => {
    const {data, loading, error} = useHomePageContent();

    if (loading || !data) return null;
    if (error) return <div>Błąd: {error}</div>;

    const {szlachetna, zobaczMnie} = data.stats;

    return (
        <StatsCardStack title="Komu już pomogliśmy?">
            <StatsCard
                icon={
                    <Box
                        component="img"
                        src={SzlachetnaPaczkaLogo}
                        alt="Szlachetna Paczka"
                        sx={{height: 60}}
                    />
                }
                value={szlachetna}
                suffix=""
                description="Rodzin ze Szlachetnej Paczki"
                animate
                useCounter
                iconColor="primary"
                animationVariant="left"
            />
            <StatsCard
                icon={
                    <Box
                        component="img"
                        src={ZobaczMnieLogo}
                        alt="Zobacz mnie"
                        sx={{height: 60}}
                    />
                }
                value={zobaczMnie}
                suffix=""
                description='Podopiecznych Fundacji "Zobacz Mnie"'
                animate
                useCounter
                iconColor="primary"
                animationVariant="right"
            />
        </StatsCardStack>
    );
};

export default HomePageAnimatedInfo;