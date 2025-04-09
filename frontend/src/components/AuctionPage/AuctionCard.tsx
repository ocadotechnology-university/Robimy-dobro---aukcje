import React from 'react';
import {
    Card, Grid, Stack, Box, Typography, IconButton, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    CardStyle,
    ImageWrapperStyle,
    ImageStyle,
    EditIconsStyle,
    FooterStyle,
} from './AuctionCard.styles';
import {SiSlack} from "react-icons/si";
const SlackIcon = SiSlack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

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
    isFollowed: boolean
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
                         isFollowed,
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
                    isFollowed={isFollowed}
                />
            </Grid>
        </Card>
    );
};

export default AuctionCard;

const ImageSection = ({ imageUrl }: { imageUrl: string }) => (
    <Grid size={{ xs: 12, md: 3 }} sx={ImageWrapperStyle}>
        <Box height={'100%'}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt="Auction item"
                sx={ImageStyle}
            />
        </Box>
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
                            isFollowed,
                        }: Omit<AuctionCardProps, 'imageUrl'>) => (
    <Grid size={{ xs: 12, md: 9 }}>
        <Stack spacing={1} height="100%" position="relative">
            <AuctionHeader title={title} date={date} city={city} />
            <AuctionDescription description={description} />
            <Box flexGrow={1} />
            <AuctionFooter status={status} supplier={supplier} winner={winner} price={price} isFollowed={isFollowed} />
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
        <Stack justifyContent={"space-between"} direction="row">
            <Typography variant="h6" fontWeight="bold">{title}</Typography>
            <EditIcons/>
        </Stack>
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
    <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1} paddingBottom={1}>
        <Typography variant="body2">
            Status licytacji: <b>{status}</b><br />
            Dostawca: <b>{supplier}</b><br/>
            Zwycięzca: <b>{winner}</b>
        </Typography>
    </Box>
);

const AuctionFooter = ({ status, supplier, winner, price, isFollowed }: { status: string; supplier: string; winner: string; price: string; isFollowed: boolean }) => (
    <Grid container spacing={2} sx={FooterStyle}>
        <AuctionStatus status={status} supplier={supplier} winner={winner}/>
        <Box display="flex" flexDirection="row" alignItems="flex-end" gap={1} paddingBottom={1}>
            <SlackIcon style={{ fontSize: '32px', cursor: 'pointer' }}/>
            {isFollowed
                ? <FavoriteIcon fontSize="large" color="primary" sx={{ cursor: 'pointer' }} />
                : <FavoriteBorderIcon fontSize="large" color="primary" style={{ cursor: 'pointer' }} />}
        </Box>
        <Box display="flex" flexDirection="column" alignItems="flex-end">
            <Typography variant="body2" fontWeight="bold">
                Aktualna cena:
            </Typography>
            <Typography fontWeight="bold" fontSize="1.7rem">
                {price} PLN
            </Typography>
        </Box>
    </Grid>
);