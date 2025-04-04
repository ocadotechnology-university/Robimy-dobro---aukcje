import {GoogleLogin} from "@react-oauth/google";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import React from "react";

export default function Auth() {
    return (
        <Container sx={{height: '100%', width: '100%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    Musisz się zalogować, aby kontynuować
                </Typography>
                <GoogleLogin
                    onSuccess={/*(credentialResponse) => console.log(credentialResponse)*/() => <Navigate to="/home"/>}
                    onError={() => console.log("Login failed")}
                />
        </Container>
)
}