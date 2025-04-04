import React from 'react';
import { Card, Grid, Stack, Box } from '@mui/material';

const AuctionCard = () => {
    return (
        <Card>
            <Grid container spacing={2}>
                <ImageSection />
                <ContentSection />
            </Grid>
        </Card>
    );
};

export default AuctionCard;

const ImageSection = () => (
    <Grid>
    </Grid>
);

const ContentSection = () => (
    <Grid>
        <Stack height="100%" position="relative">
            <EditIcons />
            <AuctionHeader />
            <AuctionDescription />
            <AuctionStatus />
            <AuctionFooter />
        </Stack>
    </Grid>
);

const EditIcons = () => <Box>{}</Box>;

const AuctionHeader = () => <Box>{}</Box>;

const AuctionDescription = () => <Box>{}</Box>;

const AuctionStatus = () => <Box>{}</Box>;

const AuctionFooter = () => <Box>{}</Box>;