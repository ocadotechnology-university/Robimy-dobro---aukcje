package com.example.backend.util;

import com.google.api.client.auth.oauth2.Credential;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.googleapis.javanet.GoogleNetHttpTransport;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.drive.Drive;
import io.github.cdimascio.dotenv.Dotenv;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.security.GeneralSecurityException;
import java.util.List;

public class GoogleApiConnector {
    private static final String APPLICATION_NAME = "robimy-dobro";
    private static final JsonFactory JSON_FACTORY = GsonFactory.getDefaultInstance();
    private static HttpTransport HTTP_TRANSPORT;
    static String credentialsPath = Dotenv.configure()
            .ignoreIfMissing()
            .load()
            .get("GOOGLE_CLIENT_ID", System.getenv("GOOGLE_CLIENT_ID"));

    static {
        try {
            HTTP_TRANSPORT = GoogleNetHttpTransport.newTrustedTransport();
        } catch (GeneralSecurityException | IOException e) {
            e.printStackTrace();
        }
    }

    public static Credential getCredential(List<String> scopes) throws IOException {
        if (credentialsPath != null) {
            return GoogleCredential.fromStream(new FileInputStream(credentialsPath));
        } else {
            InputStream in = GoogleApiConnector.class.getClassLoader().getResourceAsStream("credentials.json");
            return GoogleCredential.fromStream(in)
                    .createScoped(scopes);
        }
    }

    public static Sheets getSheetsService() throws IOException {
        Credential credential = getCredential(List.of("https://www.googleapis.com/auth/spreadsheets"));
        return new Sheets.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }

    public static Drive getDriveService() throws IOException {
        Credential credential = getCredential(List.of("https://www.googleapis.com/auth/drive"));
        return new Drive.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName(APPLICATION_NAME)
                .build();
    }
}
