import React from "react";
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import HomePageImage from "./HomePageImage";

const HomePage = () => {
    return (
        <Container maxWidth="md">
            <Stack direction="column" alignItems="center">
                <HomePageImage/>

            </Stack>
        </Container>
    );
}

export default HomePage;
