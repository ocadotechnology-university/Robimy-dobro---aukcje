import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Container, Box, Typography, Stack} from "@mui/material";
import {useAuth} from "../../hooks/AuthProvider";
import {CenteredBox} from "../common/CenteredBox";
import logoImage from "../../image/logo.png";
import typography from "../../theme/typography";

export default function Auth() {
    const navigate = useNavigate();
    const {loginWithGoogle} = useAuth();

    return (
        <Container disableGutters sx={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }}>
            <Stack direction="column" spacing={2} sx={{
                backgroundColor: 'white',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: "5%",
                padding: "3.5% 3.5%",
                width: "25%",
            }}>
                <Box sx={{}}>
                    <CenteredBox>
                        <img src={logoImage} style={{height: 250}}/>
                    </CenteredBox>
                </Box>
                <Typography sx={{textAlign: "center", ...typography.h3}}>
                    Robimy Dobro 2025
                </Typography>
                <Typography sx={{textAlign: "center", ...typography.body1}}>
                    Musisz się zalogować przy pomocy mail&#39;a służbowego, aby kontynuować
                </Typography>
                <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                        try {
                            if (credentialResponse.credential != null) {
                                await loginWithGoogle(credentialResponse.credential);
                            }
                            navigate("/home");
                        } catch (error) {
                            console.log("There was a problem with getting an access token");
                        }
                    }}
                    onError={() => console.log("Login failed")}
                />
            </Stack>
        </Container>
    )
}