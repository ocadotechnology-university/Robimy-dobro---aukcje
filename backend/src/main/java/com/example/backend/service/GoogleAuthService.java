package com.example.backend.service;

import com.example.backend.constants.CustomExeption;
import static com.example.backend.constants.ErrorMessages.GOOGLE_VERIFICATION_FAILED;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import java.util.Collections;

@Service
public class GoogleAuthService {
    private static final Dotenv dotenv = Dotenv.configure().load();
    private static final String CLIENT_ID = dotenv.get("GOOGLE_CLIENT_ID");

    HttpTransport transport = new NetHttpTransport();
    GsonFactory gsonFactory = new GsonFactory();

    public GoogleIdToken.Payload verifyGoogleToken(String token) throws CustomExeption{
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, gsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                return idToken.getPayload();
            } else {
                throw new CustomExeption(GOOGLE_VERIFICATION_FAILED);
            }

        } catch (Exception e) {
            throw new CustomExeption(GOOGLE_VERIFICATION_FAILED, e);
        }
    }

}
