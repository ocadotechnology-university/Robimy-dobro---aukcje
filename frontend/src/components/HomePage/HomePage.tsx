import React from "react";
import {Container, Stack, Typography} from '@mui/material';
import HomePageImage from "./HomePageImage";
import HomePageInfo from "./HomePageInfo";
import HomePageStats from "./HomePageStats";
import AnimatedStatsSection from "./AnimatedStatsSection";

const HomePage = () => {
    return (
        <Container maxWidth="md">
            <Stack direction="column" alignItems="center">
                <HomePageImage/>
                <HomePageInfo/>
                <HomePageStats/>
                <AnimatedStatsSection/>
                <Typography variant="subtitle2" align="center" sx={{mt: 4}}>
                    Pomagamy od 2019 roku
                </Typography>
            </Stack>
        </Container>
    );
}

export default HomePage;
