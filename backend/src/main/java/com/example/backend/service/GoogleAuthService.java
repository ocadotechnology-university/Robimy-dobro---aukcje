package com.example.backend.service;

import com.example.backend.constants.CustomException;

import static com.example.backend.constants.ErrorMessages.GOOGLE_VERIFICATION_FAILED;

import com.example.backend.util.AdminQuery;
import com.example.backend.util.GvizResponseParser;
import com.example.backend.security.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.gson.GsonFactory;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Collections;

@Service
public class GoogleAuthService {
    String CLIENT_ID = Dotenv.configure()
            .ignoreIfMissing()
            .load()
            .get("GOOGLE_CLIENT_ID", System.getenv("GOOGLE_CLIENT_ID") != null ? System.getenv("GOOGLE_CLIENT_ID") : "");
    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;

    public GoogleAuthService(GoogleSheetsService googleSheetsService, GvizResponseParser gvizResponseParser) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
    }

    HttpTransport transport = new NetHttpTransport();
    GsonFactory gsonFactory = new GsonFactory();

    public GoogleIdToken.Payload verifyGoogleToken(String token) throws CustomException {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(transport, gsonFactory)
                    .setAudience(Collections.singletonList(CLIENT_ID))
                    .build();

            GoogleIdToken idToken = verifier.verify(token);
            if (idToken != null) {
                return idToken.getPayload();
            } else {
                throw new CustomException(GOOGLE_VERIFICATION_FAILED);
            }

        } catch (Exception e) {
            throw new CustomException(GOOGLE_VERIFICATION_FAILED, e);
        }
    }

    public Role getUserRoleByEmail(String email) {
        AdminQuery adminQuery = new AdminQuery(email);
        String query = adminQuery.getQuery();
        String response = googleSheetsService.queryWithGviz(query, "Admin");

        try {
            boolean isAdmin = gvizResponseParser.hasAnyRows(response);
            return isAdmin ? Role.ADMIN : Role.USER;
        } catch (IOException e) {
            throw new RuntimeException("Failed to parse admin role from Gviz response", e);
        }
    }
}