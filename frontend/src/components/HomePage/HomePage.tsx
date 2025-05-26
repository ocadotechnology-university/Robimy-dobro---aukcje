import React from "react";
import {Container, Stack, Typography} from '@mui/material';
import HomePageImage from "./HomePageImage";
import HomePageInfo from "./HomePageInfo";

const HomePage = () => {
    return (
        <Container maxWidth="md">
            <Stack direction="column" alignItems="center">
                <HomePageImage/>
                <HomePageInfo/>
                <Typography variant="subtitle2" align="center" sx={{mt: 4}}>
                    Pomagamy od 2019 roku
                </Typography>
            </Stack>
        </Container>
    );
}

export default HomePage;
