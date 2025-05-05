import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import {HomeImageStyle} from './HomePage.styles';
import homeImage from "../../image/homePageImageRed.svg"
import {Link} from "react-router-dom";
import {HomeButton, HomeText, HomeTextSmallerMargin, HomeHeader} from "./HomePage.styles";

const Image = () => {
    return (
        <Box component="img" src={homeImage} sx={HomeImageStyle}/>
    );
}

const InvitationTextAndButton = () => {
    return (
        <Stack direction="column" alignItems="center" mt="5vmin">
            <HomeTextSmallerMargin>
                Sprawdź, co możesz wylicytować na aukcjach:
            </HomeTextSmallerMargin>
            <HomeButton component={Link} to="/auctions" variant="outlined">
                Zobacz aukcje
            </HomeButton>
        </Stack>
    );
}

const DescribingText = () => {
    return (
        <><HomeHeader variant="h5" gutterBottom>
            Licytuj i pomagaj!
        </HomeHeader><HomeTextSmallerMargin>
            Dołącz do naszej wyjątkowej inicjatywy, w której każda aukcja to szansa na wsparcie
            potrzebujących. Licytuj unikalne przedmioty i przeżycia, a cały dochód trafia na szczytny
            cel. <b>Razem możemy więcej!</b>
        </HomeTextSmallerMargin><HomeText>
            Od 2019 roku rozświetliliśmy serca rodzin ze Szlachetnej Paczki oraz wielu potrzebujących
            dzieci. W zeszłym roku zebraliśmy imponujące <b>40.000 PLN</b>, co dowodzi, że razem
            jesteśmy w stanie zdziałać wielkie rzeczy!
        </HomeText></>
    );
}

const InformationText = () => {
    return (
        <><HomeHeader variant="h5">
            Informacje ogólne
        </HomeHeader><HomeText>
            Licytacje aukcji odbędą się na <b>Slacku</b> <b><span
            style={{color: 'red'}}>#licytacje-robimy-dobro-2025</span></b> w dniach <b>21-23
            listopada</b> w godzinach <b>10:00-15:00</b>.
        </HomeText><HomeHeader variant="h5">
            Do zobaczenia!
        </HomeHeader></>
    );
}


const HomePage = () => {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={{backgroundColor: 'white'}}>
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
