import {GoogleLogin} from "@react-oauth/google";
import {useNavigate} from "react-router-dom";
import React from "react";
import {Stack, Container, Typography} from "@mui/material";
import axios from "axios";

export default function Auth() {
    const navigate = useNavigate();

    return (
        <Container sx={{height: '100%', width: '100%', display: "flex", color:"black", alignItems: "center", justifyContent: "center"}}>
                <Stack spacing={3} direction="column" alignItems="center" justifyContent="center" border={"1px solid grey"} borderRadius={"5%"} padding={"60px 25px"} sx={{backgroundColor: "white", width: '250px'}}>
                    <Typography component={"div"} textAlign={"center"} textOverflow="ellipsis" color={"grey"}>
                        Musisz się zalogować, przy pomocy mail'a służbowego aby kontynuować:
                    </Typography>
                    <GoogleLogin
                        onSuccess={async (credentialResponse) =>{

                            //Temporary setup to see if it works
                            // console.log(credentialResponse);
                            // navigate("/home");

                            //This will send the google accessToken to the backend, comment the try catch and uncomment above to see it working
                            try {
                                const res = await axios.post(
                                    "api/auth/google",
                                    { token: credentialResponse.credential },
                                    { withCredentials: true }
                                );

                                //Sending the access token to useAuth hook here with res.data.accessToken

                                console.log(credentialResponse);
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