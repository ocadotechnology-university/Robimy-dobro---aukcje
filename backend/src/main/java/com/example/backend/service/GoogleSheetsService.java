package com.example.backend.service;

import com.example.backend.util.GoogleSheetsConnector;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class GoogleSheetsService {
    private static final Dotenv dotenv = Dotenv.load();
    private static final String SPREADSHEET_ID = dotenv.get("GOOGLE_SHEET_ID");

    public List<List<Object>> readSheet(String range) throws IOException {
        Sheets sheetsService = GoogleSheetsConnector.getSheetsService();
        ValueRange response = sheetsService.spreadsheets().values()
                .get(SPREADSHEET_ID, range)
                .execute();
        return response.getValues();
    }
}
