import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Stack, Container, Typography} from "@mui/material";

export default function Auth() {
    const navigate = useNavigate();

    return (
        <Container sx={{height: '100%', width: '100%', display: "flex", color:"black", alignItems: "center", justifyContent: "center"}}>
                <Stack spacing={3} direction="column" alignItems="center" justifyContent="center" border={"1px solid grey"} borderRadius={"5%"} padding={"60px 25px"} sx={{backgroundColor: "white", width: '250px'}}>
                    <Typography component={"div"} textAlign={"center"} textOverflow="ellipsis" color={"grey"}>
                        Musisz się zalogować, przy pomocy mail'a służbowego aby kontynuować:
                    </Typography>
                    <GoogleLogin
                        onSuccess={(credentialResponse) =>{
                            console.log(credentialResponse);
                            navigate("/home");
                        }}
                        onError={() => console.log("Login failed")}
                    />
                </Stack>
        </Container>
)
}