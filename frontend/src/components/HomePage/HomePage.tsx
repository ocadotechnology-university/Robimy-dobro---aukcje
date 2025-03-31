import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import {
    HomeButtonStyle,
    HomeTextStyle,
    HomeTextStyleSmallerMargin,
    HomeHeadersStyle,
    HomeImageStyle
} from './HomePage.styles';
import homeImage from "../../image/homeImage.svg"

const Image = () => {
    return (
        <Box component="img" src={homeImage} sx={ HomeImageStyle }/>
    );
}

const InvitationTextAndButton = () => {
    return(
        <Stack direction="column" alignItems="center" mt="5vmin">
            <Typography sx={ HomeTextStyleSmallerMargin }>
                Sprawdź, co możesz wylicytować na aukcjach:
            </Typography>
            <Button variant="outlined" sx={ HomeButtonStyle }>
                Zobacz aukcje
            </Button>
        </Stack>
    );
}

const DescribingText = () => {
    return(
        <><Typography variant="h5" gutterBottom sx={HomeHeadersStyle}>
            Licytuj i pomagaj!
        </Typography><Typography sx={HomeTextStyleSmallerMargin}>
            Dołącz do naszej wyjątkowej inicjatywy, w której każda aukcja to szansa na wsparcie
            potrzebujących. Licytuj unikalne przedmioty i przeżycia, a cały dochód trafia na szczytny
            cel. <b>Razem możemy więcej!</b>
        </Typography><Typography sx={HomeTextStyle}>
            Od 2019 roku rozświetliliśmy serca rodzin ze Szlachetnej Paczki oraz wielu potrzebujących
            dzieci. W zeszłym roku zebraliśmy imponujące <b>40.000 PLN</b>, co dowodzi, że razem
            jesteśmy w stanie zdziałać wielkie rzeczy!
        </Typography></>
    );
}

const InformationText = () => {
    return(
        <><Typography variant="h5" sx={HomeHeadersStyle}>
            Informacje ogólne
        </Typography><Typography sx={HomeTextStyle}>
            Licytacje aukcji odbędą się na <b>Slacku</b> <b><span
            style={{color: 'red'}}>#licytacje-robimy-dobro-2025</span></b> w dniach <b>21-23
            listopada</b> w godzinach <b>10:00-15:00</b>.
        </Typography><Typography variant="h5" sx={HomeHeadersStyle}>
            Do zobaczenia!
        </Typography></>
    );
}



const HomePage = () => {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={{height: '100dvh'}}>
                <Stack direction="column" alignItems="center">
                    <Image/>
                    <InvitationTextAndButton/>
                    <Stack direction="column" alignItems="center" mt="5vmin">
                        <DescribingText/>
                        <InformationText/>
                    </Stack>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default HomePage;
