import React from "react";
import {useNavigate, Link as RouterLink} from 'react-router-dom';
import {Stack, Typography, Button} from "@mui/material";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import PrimaryActionButton from "../../common/PrimaryActionButton";

const HomePageInfo = () => {
    const navigate = useNavigate();
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

            <Typography variant="subtitle1">
                Zapraszamy na fantastyczne licytacje w dniach <strong>22, 23 i 24 listopada</strong>!
                <br/>
                Slack: <strong>#robimydobro-2025-licytacje</strong>
            </Typography>
        </Stack>
    );
};

export default HomePageInfo;