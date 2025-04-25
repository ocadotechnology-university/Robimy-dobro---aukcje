import NavBar from "./components/NavBar/NavBar";
import Container from "@mui/material/Container";
import {Outlet} from "react-router-dom";

function Root() {
    return (
        <Container maxWidth="lg" disableGutters sx={{bgcolor: 'white', minHeight: '100vh'}}>
            <NavBar/>
            <Outlet/>
        </Container>
    )
}

export default Root;