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
    private static final Dotenv dotenv = Dotenv.configure().load();
    private static final String SPREADSHEET_ID = dotenv.get("GOOGLE_SHEET_ID");

    public List<List<Object>> readSheet(String range) throws IOException {
        Sheets sheetsService = GoogleSheetsConnector.getSheetsService();
        ValueRange response = sheetsService.spreadsheets().values()
                .get(SPREADSHEET_ID, range)
                .execute();
        return response.getValues();
    }

    public void writeToSheet(String range, List<List<Object>> values) throws IOException {
        Sheets sheetsService = GoogleSheetsConnector.getSheetsService();
        ValueRange body = new ValueRange().setValues(values);
        sheetsService.spreadsheets().values()
                .update(GoogleSheetsService.SPREADSHEET_ID, range, body)
                .setValueInputOption("RAW")
                .execute();
    }

    public void appendRow(String sheetName, List<List<Object>> values) throws IOException {
        Sheets sheetsService = GoogleSheetsConnector.getSheetsService();
        ValueRange body = new ValueRange().setValues(values);
        sheetsService.spreadsheets().values()
                .append(SPREADSHEET_ID, sheetName, body)
                .setValueInputOption("RAW")
                .setInsertDataOption("INSERT_ROWS")
                .execute();
    }
}