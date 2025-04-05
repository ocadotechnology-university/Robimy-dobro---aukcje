import React from 'react';
import {
    Card, Grid, Stack, Box, Typography, IconButton, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LaunchIcon from '@mui/icons-material/Launch';

type AuctionCardProps = {
    title: string;
    date: string;
    city: string;
    description: string;
    status: string;
    supplier: string;
    winner: string;
    price: string;
    imageUrl: string;
};

const AuctionCard = ({
                         title,
                         date,
                         city,
                         description,
                         status,
                         supplier,
                         winner,
                         price,
                         imageUrl,
                     }: AuctionCardProps) => {
    return (
        <Card>
            <Grid container spacing={2}>
                <ImageSection imageUrl={imageUrl} />
                <ContentSection
                    title={title}
                    date={date}
                    city={city}
                    description={description}
                    status={status}
                    supplier={supplier}
                    winner={winner}
                    price={price}
                />
            </Grid>
        </Card>
    );
};

export default AuctionCard;

const ImageSection = ({ imageUrl }: { imageUrl: string }) => (
    <Grid size={{ xs: 12, sm: 3 }}>
        <CardMedia
            component="img"
            image={imageUrl}
            alt="Auction item"
        />
    </Grid>
);

const ContentSection = ({title,
                            date,
                            city,
                            description,
                            status,
                            supplier,
                            winner,
                            price,
                        }: Omit<AuctionCardProps, 'imageUrl'>) => (
    <Grid size={{ xs: 12, sm: 9 }}>
        <Stack spacing={1} height="100%" position="relative">
            <EditIcons />
            <AuctionHeader title={title} date={date} city={city} />
            <AuctionDescription description={description} />
            <AuctionStatus status={status} supplier={supplier} winner={winner} />
            <AuctionFooter price={price} />
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

const AuctionHeader = ({ title, date, city }: { title: string; date: string; city: string }) => (
    <>
        <Typography variant="h6" fontWeight="bold">{title}</Typography>
        <Stack direction="row" spacing={1} alignItems="center">
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">{date}</Typography>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">{city}</Typography>
        </Stack>
    </>
);

const AuctionDescription = ({ description }: { description: string }) => (
    <Typography variant="body2" color="text.secondary">
        {description}
    </Typography>
);

const AuctionStatus = ({
                           status,
                           supplier,
                           winner,
                       }: { status: string; supplier: string; winner: string }) => (
    <Typography variant="body2">
        Status: {status}<br />
        Supplier: {supplier}<br />
        Winner: {winner}
    </Typography>
);

const AuctionFooter = ({ price }: { price: string }) => (
    <Box display="flex" justifyContent="flex-end" alignItems="center" gap={2}>
        <LaunchIcon />
        <FavoriteBorderIcon />
        <Typography fontWeight="bold">{price} PLN</Typography>
    </Box>
);