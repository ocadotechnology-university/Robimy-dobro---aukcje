package com.example.backend.service;

import com.example.backend.util.UrlSanitizer;
import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Collections;
import java.util.List;

@Service
public class GoogleSheetsService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleSheetsService.class);
    private Sheets sheetsService;
    private final String SPREADSHEET_ID;

    public GoogleSheetsService(Sheets sheetsService, @Qualifier("googleSheetsSpreadsheetId") String SPREADSHEET_ID) {
        this.sheetsService = sheetsService;
        this.SPREADSHEET_ID = SPREADSHEET_ID;
    }

    public List<List<Object>> readAll(String sheetName) throws IOException {
        logger.info("Reading all data from sheet: {}", sheetName);
        ValueRange response = sheetsService.spreadsheets().values()
                .get(SPREADSHEET_ID, sheetName)
                .execute();
        return response.getValues() != null ? response.getValues() : Collections.emptyList();
    }

    public void appendRow(String sheetName, List<List<Object>> values) throws IOException {
        logger.info("Appending row to sheet: {}", sheetName);
        ValueRange body = new ValueRange().setValues(values);
        sheetsService.spreadsheets().values()
                .append(SPREADSHEET_ID, sheetName, body)
                .setValueInputOption("RAW")
                .setInsertDataOption("INSERT_ROWS")
                .execute();
    }

    public void updateCellValue(String sheetName, int rowIndex, int columnIndex, String value) throws IOException {
        logger.info("Updating cell [{},{}] value in sheet: {}", rowIndex, columnIndex, sheetName);
        String cell = sheetName + "!" + (char) ('A' + columnIndex) + (rowIndex + 1);
        ValueRange body = new ValueRange().setValues(List.of(List.of(value)));
        sheetsService.spreadsheets().values()
                .update(SPREADSHEET_ID, cell, body)
                .setValueInputOption("RAW")
                .execute();
    }

    public void updateRow(String sheetName, int rowIndex, List<Object> values) throws IOException {
        logger.info("Updating row {} in sheet: {}", rowIndex, sheetName);
        String row = sheetName + "!A" + (rowIndex + 1);
        ValueRange body = new ValueRange().setValues(List.of(values));
        sheetsService.spreadsheets().values()
                .update(SPREADSHEET_ID, row, body)
                .setValueInputOption("USER_ENTERED")
                .execute();
    }

    private Integer getSheetIdByName(String sheetName) throws IOException {
        return sheetsService.spreadsheets()
                .get(SPREADSHEET_ID)
                .execute()
                .getSheets()
                .stream()
                .filter(sheet -> sheet.getProperties().getTitle().equals(sheetName))
                .findFirst()
                .map(sheet -> sheet.getProperties().getSheetId())
                .orElse(null);
    }

    public void deleteRow(String sheetName, int rowIndex) throws IOException {
        logger.info("Deleting row {} from sheet: {}", rowIndex, sheetName);

        Integer sheetId = getSheetIdByName(sheetName);
        if (sheetId == null) {
            throw new IllegalArgumentException("Sheet not found: " + sheetName);
        }

        DeleteDimensionRequest deleteRequest = new DeleteDimensionRequest()
                .setRange(new DimensionRange()
                        .setSheetId(sheetId)
                        .setDimension("ROWS")
                        .setStartIndex(rowIndex)
                        .setEndIndex(rowIndex + 1)
                );

        Request request = new Request().setDeleteDimension(deleteRequest);

        BatchUpdateSpreadsheetRequest body = new BatchUpdateSpreadsheetRequest()
                .setRequests(List.of(request));

        sheetsService.spreadsheets()
                .batchUpdate(SPREADSHEET_ID, body)
                .execute();
    }

    public String queryWithGviz(String gvizQuery, String sheetName) {
        logger.info("Creating query from: {}", gvizQuery);
        String encodedQuery = URLEncoder.encode(gvizQuery, StandardCharsets.UTF_8);
        String url = "https://docs.google.com/spreadsheets/d/" +
                SPREADSHEET_ID +
                "/gviz/tq?tq=" + encodedQuery +
                "&sheet=" + sheetName;

        url = UrlSanitizer.sanitize(url);
        RestTemplate restTemplate = new RestTemplate();
        return restTemplate.getForObject(url, String.class);
    }
}