import React from 'react';
import {
    Card, Grid2, Stack, Box, Typography, IconButton, CardMedia
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
    CardStyle,
    ImageWrapperStyle,
    ImageStyle,
    AuctionCardFooterGrid, IconBox,
} from './AuctionCard.styles';
import {SiSlack} from "react-icons/si";

const SlackIcon = SiSlack as unknown as React.FC<React.SVGProps<SVGSVGElement>>;

type AuctionCardProps = {
    title: string;
    date: string;
    city: string;
    description: string;
    status: string;
    hasBids: boolean;
    supplier: string;
    winner: string;
    price: string;
    imageUrl: string;
    isFollowed: boolean
    slackUrl: string;
};

const getStatusLabel = (status: string): string => {
    const map: Record<string, string> = {
        "NOT_STARTED": "Nierozpoczęta",
        "IN_PROGRESS": "W trakcie",
        "FINISHED": "Zakończona"
    };
    return map[status] || status;
};

const getPriceLabel = (status: string, hasBids: boolean): string => {
    switch (status) {
        case "NOT_STARTED":
            return "Cena wywoławcza:";
        case "IN_PROGRESS":
            return hasBids ? "Aktualna cena:" : "Cena wywoławcza:";
        case "FINISHED":
            return "Wylicytowana cena:";
        default:
            return "Cena:";
    }
};

const AuctionCard = ({
                         title,
                         date,
                         city,
                         description,
                         status,
                         hasBids,
                         supplier,
                         winner,
                         price,
                         imageUrl,
                         isFollowed,
                         slackUrl
                     }: AuctionCardProps) => {
    return (
        <Card variant="outlined" sx={CardStyle}>
            <Grid2 container spacing={2}>
                <ImageSection imageUrl={imageUrl}/>
                <ContentSection
                    title={title}
                    date={date}
                    city={city}
                    description={description}
                    status={status}
                    hasBids={hasBids}
                    supplier={supplier}
                    winner={winner}
                    price={price}
                    isFollowed={isFollowed}
                    slackUrl={slackUrl}
                />
            </Grid2>
        </Card>
    );
};

export default AuctionCard;

const ImageSection = ({imageUrl}: { imageUrl: string }) => (
    <Grid2 size={{xs: 12, md: 3}} sx={ImageWrapperStyle}>
        <Box height={'100%'}>
            <CardMedia
                component="img"
                image={imageUrl}
                alt="Auction item"
                sx={ImageStyle}
            />
        </Box>
    </Grid2>
);

const ContentSection = ({
                            title,
                            date,
                            city,
                            description,
                            status,
                            hasBids,
                            supplier,
                            winner,
                            price,
                            isFollowed,
                            slackUrl
                        }: Omit<AuctionCardProps, 'imageUrl'>) => (
    <Grid2 size={{xs: 12, md: 9}}>
        <Stack spacing={1} height="100%" position="relative">
            <AuctionHeader title={title} date={date} city={city} price={price} status={status} hasBids={hasBids}/>
            <AuctionDescription description={description}/>
            <Box flexGrow={1}/>
            <AuctionFooter status={status} supplier={supplier} winner={winner} isFollowed={isFollowed}
                           slackUrl={slackUrl}/>
        </Stack>
    </Grid2>
);

const AuctionHeader = ({
                           title,
                           date,
                           city,
                           price,
                           status,
                           hasBids,
                       }: {
    title: string;
    date: string;
    city: string;
    price: string;
    status: string;
    hasBids: boolean;
}) => {
    const priceLabel = getPriceLabel(status, hasBids);

    return (
        <Stack justifyContent={"space-between"} direction="row" alignItems="flex-start" sx={{width: "100%"}}>
            <Box>
                <Typography variant="h6" fontWeight="bold">{title}</Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                    <CalendarTodayIcon fontSize="small"/>
                    <Typography variant="body2"><b>{date}</b></Typography>
                    <LocationOnIcon fontSize="small"/>
                    <Typography variant="body2">
                        Odbiór tylko w: <b>{city}</b>
                    </Typography>
                </Stack>
            </Box>
            <Box display="flex" flexDirection="column" alignItems="flex-end">
                <Typography variant="body2" fontWeight="bold">
                    {priceLabel}
                </Typography>
                <Typography fontWeight="bold" fontSize="1.7rem">
                    {price} PLN
                </Typography>
            </Box>
        </Stack>
    );
};

const AuctionDescription = ({description}: { description: string }) => (
    <Typography variant="body2" color="text.secondary">
        {description}
    </Typography>
);

const AuctionStatus = ({
                           status,
                           supplier,
                           winner,
                       }: { status: string; supplier: string; winner: string }) => {
    const statusLabel = getStatusLabel(status);
    return (
        <Box display="flex" flexDirection="column" justifyContent="flex-end" flexGrow={1} paddingBottom={1}>
            <Typography variant="body2">
                Status licytacji: <b>{statusLabel}</b><br/>
                Dostawca: <b>{supplier}</b><br/>
                Zwycięzca: <b>{winner}</b>
            </Typography>
        </Box>
    );
};

const AuctionFooter = ({
                           status,
                           supplier,
                           winner,
                           isFollowed,
                           slackUrl
                       }: {
    status: string;
    supplier: string;
    winner: string;
    isFollowed: boolean;
    slackUrl: string;
}) => (
    <AuctionCardFooterGrid container spacing={2}>
        <AuctionStatus status={status} supplier={supplier} winner={winner}/>
        <Box display="flex" flexDirection="row" alignItems="flex-end" gap={1} paddingBottom={1}>
            <SlackIcon
                onClick={() => window.open(slackUrl, '_blank', 'noopener,noreferrer')}
                style={{fontSize: '28px', cursor: 'pointer', margin: '5px'}}
            />
            {isFollowed
                ? <FavoriteIcon fontSize="large" color="primary" sx={{cursor: 'pointer'}}/>
                : <FavoriteBorderIcon fontSize="large" color="primary" sx={{cursor: 'pointer'}}/>}
            <IconBox>
                <IconButton size="small">
                    <EditIcon/>
                </IconButton>
            </IconBox>
            <IconBox>
                <IconButton size="small">
                    <DeleteIcon/>
                </IconButton>
            </IconBox>
        </Box>
    </AuctionCardFooterGrid>
);