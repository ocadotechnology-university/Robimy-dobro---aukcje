import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Stack, Container, Typography} from "@mui/material";
import {useAuth} from "../../hooks/AuthProvider";

export default function Auth() {
    const navigate = useNavigate();
    const {loginWithGoogle} = useAuth();

    return (
        <Container
            sx={(theme) => ({
                height: '100%',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: theme.palette.text.primary,
            })}
        >
            <Stack
                spacing={3}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.paper,
                    width: '250px',
                    border: '1px solid',
                    borderColor: theme.palette.grey[400],
                    borderRadius: "5%",
                    padding: "60px 25px",
                })}
            >
                <Typography
                    component="div"
                    textAlign="center"
                    textOverflow="ellipsis"
                    sx={(theme) => ({
                        color: theme.palette.text.secondary,
                    })}
                >
                    Musisz się zalogować, przy pomocy mail'a służbowego aby kontynuować:
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