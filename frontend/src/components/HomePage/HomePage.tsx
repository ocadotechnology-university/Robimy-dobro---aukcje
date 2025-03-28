import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import homeImage from "../../image/homeImage.svg"

function HomePage() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={{ height: '100dvh' }}>
                <Stack direction="column" alignItems="center">
                    <Box component="img" src={homeImage} width="65%" mt="5vmin" />
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default HomePage;
