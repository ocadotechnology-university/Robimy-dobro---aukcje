import React from 'react';
import {
    Card, Grid, Stack, Box, Typography, IconButton,
    CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LaunchIcon from '@mui/icons-material/Launch';

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
        <CardMedia
            component="img"
            image=""
            alt="Auction item"
        />
    </Grid>
);

const ContentSection = () => (
    <Grid>
        <Stack spacing={1} height="100%" position="relative">
            <EditIcons />
            <AuctionHeader />
            <AuctionDescription />
            <AuctionStatus />
            <AuctionFooter />
        </Stack>
    </Grid>
);

const EditIcons = () => (
    <Box position="absolute" top={0} right={0}>
        <IconButton size="small">
            <EditIcon />
        </IconButton>
    </Box>
);

const AuctionHeader = () => (
    <>
        <Typography variant="h6" fontWeight="bold">
            Auction Title
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">22.11.2025</Typography>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">Wrocław</Typography>
        </Stack>
    </>
);

const AuctionDescription = () => (
    <Typography variant="body2" color="text.secondary">
        Auction description will be here
    </Typography>
);

const AuctionStatus = () => (
    <Typography variant="body2">
        Status:<br />
        Supplier: <br />
        Winner:
    </Typography>
);

const AuctionFooter = () => (
    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <LaunchIcon />
        <FavoriteBorderIcon />
        <Typography fontWeight="bold">100 PLN</Typography>
    </Box>
);