import React from "react";
import {Container, Stack, Typography} from '@mui/material';
import HomePageImage from "./HomePageImage";
import HomePageInfo from "./HomePageInfo";
import HomePageStats from "./HomePageStats";
import HomePageAnimatedStats from "./HomePageAnimatedStats";
import HomePageAnimatedInfo from "./HomePageAnimatedInfo";

const HomePage = () => {
    return (
        <Container maxWidth="md">
            <Stack direction="column" alignItems="center" spacing={3} mt={4}>
                <HomePageImage/>
                <HomePageInfo/>
                <HomePageStats/>
                <HomePageAnimatedStats/>
                <HomePageAnimatedInfo/>
                <Typography variant="subtitle2" align="center" sx={{py: 3}}>
                    Pomagamy od 2019 roku
                </Typography>
            </Stack>
        </Container>
    );
}

export default HomePage;
