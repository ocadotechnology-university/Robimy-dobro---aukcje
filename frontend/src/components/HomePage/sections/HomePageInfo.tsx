import React from "react";
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {Stack, Typography, Button} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PrimaryActionButton from "../../common/PrimaryActionButton";
import {useAuctionDates} from "../../../contexts/AuctionDatesContext";
import {useHomePageContent} from "../../../hooks/useHomePageContent";

const HomePageInfo = () => {
    const navigate = useNavigate();
    const {dates, loading} = useAuctionDates();
    const {data, loading: loadingContent} = useHomePageContent();
    const today = new Date().toISOString().split('T')[0];
    const isAuctionDay = dates.some(date =>
        date.toISOString().split('T')[0] === today
    );


    const getAuctionDatesText = () => {
        if (dates.length === 0) return "";

        const sortedDates = [...dates].sort((a, b) => a.getDate() - b.getDate());
        const dayNumbers = sortedDates.map(d => d.getDate());

        const monthGenitive = new Intl.DateTimeFormat("pl-PL", {
            month: "long",
            day: "numeric"
        }).formatToParts(sortedDates[0]).find(p => p.type === "month")?.value;

        if (!monthGenitive) return "";

        if (dayNumbers.length === 1) return `${dayNumbers[0]} ${monthGenitive}`;
        if (dayNumbers.length === 2) return `${dayNumbers[0]} i ${dayNumbers[1]} ${monthGenitive}`;

        const allButLast = dayNumbers.slice(0, -1).join(", ");
        const last = dayNumbers[dayNumbers.length - 1];
        return `${allButLast} i ${last} ${monthGenitive}`;
    };

    return (
        <Stack direction="column" alignItems="center" spacing={3} mt={3} textAlign="center">
            <Typography variant="subtitle2">
                Dołącz do naszej inicjatywy! <br/>
                Wystawiaj przedmioty, licytuj i wspieraj szczytny cel. <br/>
                Razem zmieniamy świat na lepsze!
            </Typography>

            <PrimaryActionButton
                label="Zobacz wszystkie aukcje"
                onClick={() => navigate('/auctions')}
            />

            {!loading && isAuctionDay && (
                <Button
                    variant="text"
                    onClick={() => navigate('/auctions', {state: {dateFilter: today}})}
                    endIcon={<ArrowRightAltIcon/>}
                    sx={{textTransform: 'none', fontSize: '0.9rem', color: 'text.primary'}}
                >
                    lub zobacz dzisiejsze aukcje
                </Button>
            )}

            {(!loading && data && !loadingContent) && (
                <Typography variant="subtitle1">
                    Zapraszamy na fantastyczne licytacje w dniach <strong>{getAuctionDatesText()}</strong>!
                    <br/>
                    Slack: <strong>{data.slackChannel}</strong>
                </Typography>
            )}
        </Stack>
    );
};

export default HomePageInfo;