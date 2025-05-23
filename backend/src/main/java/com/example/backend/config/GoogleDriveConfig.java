package com.example.backend.config;

import com.example.backend.util.GoogleApiConnector;
import com.google.api.services.drive.Drive;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class GoogleDriveConfig {
    private static final Logger logger = LoggerFactory.getLogger(GoogleDriveConfig.class);

    @Bean
    public Drive googleDrive() throws IOException {
        return GoogleApiConnector.getDriveService();
    }

    @Bean
    public String googleDriveFolderId() {
        String folderId = Dotenv.configure()
                .ignoreIfMissing()
                .load()
                .get("GOOGLE_DRIVE_FOLDER_ID", System.getenv("GOOGLE_DRIVE_FOLDER_ID"));
        if (folderId.isBlank()) {
            logger.error("GOOGLE_DRIVE_FOLDER_ID id not found in .env file");
            throw new IllegalStateException("GOOGLE_DRIVE_FOLDER_ID not found in .env file");
        }
        return folderId;
    }
}
