import {GoogleLogin} from "@react-oauth/google";
import {useGoogleLogin} from "@react-oauth/google";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import GoogleIcon from '@mui/icons-material/Google';

export default function Auth() {
    const login = useGoogleLogin({
        onSuccess: (credentialResponse) => console.log(credentialResponse)
    })

    return (
        <Container sx={{height: '100%', width: '100%', display: "flex", alignItems: "center", justifyContent: "center"}}>
                <Button startIcon={<GoogleIcon/>} variant="outlined" onClick={() => login()}
                        sx={{
                            color: "black",
                            borderColor: "Grey",
                            background:"white"}}
                >
                    Continue with google
                </Button>
                {/*<GoogleLogin
                    onSuccess={(credentialResponse) => console.log(credentialResponse)}
                    onError={() => console.log("Login failed")}
                />*/}
        </Container>
)
}