import React from "react";
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {Stack, Typography, Button} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PrimaryActionButton from "../../common/PrimaryActionButton";
import {useAuctionDates} from "../../../contexts/AuctionDatesContext";

const HomePageInfo = () => {
    const navigate = useNavigate();
    const {dates, loading} = useAuctionDates();

    const getAuctionDatesText = () => {
        if (dates.length === 0) return "";

        const dayNumbers = dates.map(d => d.getDate()).sort((a, b) => a - b);
        const monthName = dates[0].toLocaleString("pl-PL", { month: "long", day: 'numeric' });

        if (dayNumbers.length === 1) return `${dayNumbers[0]} ${monthName}`;
        if (dayNumbers.length === 2) return `${dayNumbers[0]} i ${dayNumbers[1]} ${monthName}`;

        const allButLast = dayNumbers.slice(0, -1).join(", ");
        const last = dayNumbers[dayNumbers.length - 1];
        return `${allButLast} i ${last} ${monthName}`;
    };

    return (
        <Stack direction="column" alignItems="center" spacing={3} mt={3} textAlign="center">
            <Typography variant="subtitle2">
                Dołącz do naszej inicjatywy! <br/>
                Wystawiaj przedmioty, licytuj i wspieraj szczytny cel. <br/>
                Razem zmieniamy świat na lepsze!
            </Typography>

            <PrimaryActionButton
                label="Zobacz Aukcje Dnia"
                onClick={() => navigate('/auctions')}
            />

            <Button
                variant="text"
                component={RouterLink}
                to="/auctions"
                endIcon={<ArrowRightAltIcon/>}
                sx={{textTransform: 'none', fontSize: '0.9rem', color: 'text.primary'}}
            >
                lub przeglądaj wszystkie aukcje
            </Button>

            {!loading && (
                <Typography variant="subtitle1">
                    Zapraszamy na fantastyczne licytacje w dniach <strong>{getAuctionDatesText()}</strong>!
                    <br/>
                    Slack: <strong>#robimydobro-2025-licytacje</strong>
                </Typography>
            )}
        </Stack>
    );
};

export default HomePageInfo;