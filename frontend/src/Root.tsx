import {ReactNode} from "react";
import NavBar from "./components/NavBar/NavBar";
import Container from "@mui/material/Container";

function Root({children}: { children: ReactNode }) {
    return (
        <Container maxWidth="lg" disableGutters sx={{bgcolor: 'white', minHeight: '100vh'}}>
            <NavBar/>
            {children}
        </Container>
    )
}

export default Root;