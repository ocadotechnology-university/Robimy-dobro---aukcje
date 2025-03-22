import {GoogleLogin} from "@react-oauth/google";

export default function Auth() {
    return (
        <GoogleLogin
            onSuccess={(credentialResponse) => console.log(credentialResponse)}
            onError={() => console.log("Login failed")}
        />
    )
}