import {GoogleLogin} from "@react-oauth/google";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import {Navigate} from "react-router-dom";
import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";

export default function Auth() {
    return (
        <Container sx={{height: '100%', width: '100%', display: "flex", color:"black", alignItems: "center", justifyContent: "center"}}>
                <Stack spacing={3} direction="column" alignItems="center" justifyContent="center" border={"2px solid grey"} borderRadius={"5%"} padding={"70px 30px"} sx={{backgroundColor: "white", width: '250px'}}>
                    <Typography variant="h5" component="div" textAlign="center" textOverflow="ellipsis" color={"grey"}>
                        Musisz się zalogować, aby kontynuować
                    </Typography>
                    <GoogleLogin
                        onSuccess={/*(credentialResponse) => console.log(credentialResponse)*/() => <Navigate to="/home"/>}
                        onError={() => console.log("Login failed")}
                    />
                </Stack>
        </Container>
)
}