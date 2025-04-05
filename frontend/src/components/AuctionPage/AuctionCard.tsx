import React from 'react';
import {
    Card, Grid, Stack, Box, Typography, IconButton, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LaunchIcon from '@mui/icons-material/Launch';
import {
    CardStyle,
    ImageWrapperStyle,
    ImageStyle,
    EditIconsStyle,
    FooterStyle,
} from './AuctionCard.styles';

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
        <Card variant="outlined" sx={CardStyle}>
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
    <Grid size={{ xs: 12, sm: 3 }} sx={ImageWrapperStyle}>
        <CardMedia
            component="img"
            image={imageUrl}
            alt="Auction item"
            sx={ImageStyle}
        />
    </Grid>
);

const ContentSection = ({
                            title,
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
    <Box sx={EditIconsStyle}>
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
            <Typography variant="body2"><b>{date}</b></Typography>
            <LocationOnIcon fontSize="small" />
            <Typography variant="body2">
                Odbiór tylko w: <b>{city}</b>
            </Typography>
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
        Status licytacji: <b>{status}</b><br/>
        Dostawca: <b>{supplier}</b><br/>
        Zwycięzca: <b>{winner}</b>
    </Typography>
);

const AuctionFooter = ({ price }: { price: string }) => (
    <Box sx={FooterStyle}>
        <LaunchIcon />
        <FavoriteBorderIcon />
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" fontWeight="bold">
                Aktualna cena:
            </Typography>
            <Typography fontWeight="bold" fontSize="1.7rem">
                {price} PLN
            </Typography>
        </Box>
    </Box>
);