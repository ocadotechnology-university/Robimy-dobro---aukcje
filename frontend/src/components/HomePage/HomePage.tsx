import React from "react";
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import homeImage from "../../image/homeImage.svg"

function HomePage() {
    return (
        <React.Fragment>
            <CssBaseline/>
            <Container maxWidth="md" sx={{height: '100dvh'}}>
                <Stack direction="column" alignItems="center">
                    <Box component="img" src={homeImage} width="65%" mt="5vmin"/>
                    <Stack direction="column" alignItems="center" mt="5vmin">
                        <Typography variant="h5" gutterBottom sx={{fontWeight: "550", marginBottom: "1.5vmin"}}>
                            Licytuj i pomagaj!
                        </Typography>
                        <Typography sx={{fontSize: "17px", marginBottom: "1vmin"}}>
                            Dołącz do naszej wyjątkowej inicjatywy, w której każda aukcja to szansa na wsparcie
                            potrzebujących. Licytuj unikalne przedmioty i przeżycia, a cały dochód trafia na szczytny
                            cel. <b>Razem możemy więcej!</b>
                        </Typography>
                        <Typography sx={{fontSize: "17px", marginBottom: "2vmin"}}>
                            Od 2019 roku rozświetliliśmy serca rodzin ze Szlachetnej Paczki oraz wielu potrzebujących
                            dzieci. W zeszłym roku zebraliśmy imponujące <b>40.000 PLN</b>, co dowodzi, że razem
                            jesteśmy w stanie zdziałać wielkie rzeczy!
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{fontWeight: "550", marginBottom: "1.5vmin"}}>
                            Informacje ogólne
                        </Typography>
                        <Typography sx={{fontSize: "17px", marginBottom: "2vmin"}}>
                            Licytacje aukcji odbędą się na <b>Slacku</b> <b><span
                            style={{color: 'red'}}>#licytacje-robimy-dobro-2025</span></b> w dniach <b>21-23
                            listopada</b> w godzinach <b>10:00-15:00</b>.
                        </Typography>
                        <Typography variant="h5" sx={{fontWeight: "550"}}>
                            Do zobaczenia!
                        </Typography>
                    </Stack>
                </Stack>
            </Container>
        </React.Fragment>
    );
}

export default HomePage;
