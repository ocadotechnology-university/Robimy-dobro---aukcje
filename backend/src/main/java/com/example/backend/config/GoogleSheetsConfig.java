package com.example.backend.config;

import com.example.backend.util.GoogleApiConnector;
import com.google.api.services.sheets.v4.Sheets;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class GoogleSheetsConfig {
    private static final Logger logger = LoggerFactory.getLogger(GoogleSheetsConfig.class);

    @Bean
    public Sheets googleSheets() throws IOException {
        return GoogleApiConnector.getSheetsService();
    }

    @Bean
    public String googleSheetsSpreadsheetId() {
        String spreadsheetId = Dotenv.configure()
                .ignoreIfMissing()
                .load()
                .get("GOOGLE_SHEET_ID", System.getenv("GOOGLE_SHEET_ID") != null ? System.getenv("GOOGLE_SHEET_ID") : "");
        if (spreadsheetId.isEmpty()) {
            logger.error("GOOGLE_SHEET_ID not found in .env file");
            throw new IllegalStateException("GOOGLE_SHEET_ID not found in .env file");
        }
        return spreadsheetId;
    }
}
