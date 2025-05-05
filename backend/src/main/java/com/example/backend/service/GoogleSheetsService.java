package com.example.backend.service;

import com.example.backend.util.UrlSanitizer;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Service
public class GoogleSheetsService {
    private Sheets sheetsService;
    private final String SPREADSHEET_ID;

    public GoogleSheetsService(Sheets sheetsService, String SPREADSHEET_ID){
        this.sheetsService = sheetsService;
        this.SPREADSHEET_ID = SPREADSHEET_ID;
    }

    public List<List<Object>> readAll(String sheetName) throws IOException {
        ValueRange response = sheetsService.spreadsheets().values()
                .get(SPREADSHEET_ID, sheetName)
                .execute();
        return response.getValues();
    }

    public void appendRow(String sheetName, List<List<Object>> values) throws IOException {
        ValueRange body = new ValueRange().setValues(values);
        sheetsService.spreadsheets().values()
                .append(SPREADSHEET_ID, sheetName, body)
                .setValueInputOption("RAW")
                .setInsertDataOption("INSERT_ROWS")
                .execute();
    }

    public void updateCellValue(String sheetName, int rowIndex, int columnIndex, String value) throws IOException {
        String cell = sheetName + "!" + (char) ('A' + columnIndex) + (rowIndex + 1);
        ValueRange body = new ValueRange().setValues(List.of(List.of(value)));
        sheetsService.spreadsheets().values()
                .update(SPREADSHEET_ID, cell, body)
                .setValueInputOption("RAW")
                .execute();
    }

    public void updateRow(String sheetName, int rowIndex, List<Object> values) throws IOException {
        String row = sheetName + "!A" + (rowIndex + 1);
        ValueRange body = new ValueRange().setValues(List.of(values));
        sheetsService.spreadsheets().values()
                .update(SPREADSHEET_ID, row, body)
                .setValueInputOption("USER_ENTERED")
                .execute();
    }

    public String queryWithGviz(String gvizQuery) {
        String encodedQuery = URLEncoder.encode(gvizQuery, StandardCharsets.UTF_8);
        String url = "https://docs.google.com/spreadsheets/d/" + SPREADSHEET_ID + "/gviz/tq?tq=" + encodedQuery;
        url = UrlSanitizer.sanitize(url);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}