package com.example.backend.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class GoogleSheetsHeaderMappingService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleSheetsHeaderMappingService.class);

    private final GoogleSheetsService sheetsService;
    private final Map<String, Map<String, Integer>> headerIndexMapPerSheet = new HashMap<>();
    private final Map<String, Map<String, String>> headerLetterMapPerSheet = new HashMap<>();

    public GoogleSheetsHeaderMappingService(GoogleSheetsService sheetsService) {
        this.sheetsService = sheetsService;
    }

    public void loadHeadersForSheet(String sheetName) {
        try {
            List<List<Object>> rows = sheetsService.readAll(sheetName);
            if (!rows.isEmpty()) {
                List<Object> headers = rows.get(0);
                Map<String, Integer> indexMap = new HashMap<>();
                Map<String, String> letterMap = new HashMap<>();

                for (int i = 0; i < headers.size(); i++) {
                    String header = headers.get(i).toString().trim();
                    indexMap.put(header, i);
                    letterMap.put(header, columnIndexToLetter(i));
                }

                headerIndexMapPerSheet.put(sheetName, indexMap);
                headerLetterMapPerSheet.put(sheetName, letterMap);

                logger.info("Loaded {} headers from sheet '{}': {}", headers.size(), sheetName, headers);
            } else {
                logger.warn("No headers found in sheet '{}'", sheetName);
            }
        } catch (IOException e) {
            logger.error("Failed to load headers from sheet '{}'", sheetName, e);
            throw new RuntimeException("Failed to load headers from sheet '" + sheetName + "'", e);
        }
    }

    public Map<String, String> getHeaderLetterMap(String sheetName) {
        ensureHeadersLoaded(sheetName);
        return headerLetterMapPerSheet.get(sheetName);
    }

    public int getColumnIndex(String sheetName, String headerName) {
        ensureHeadersLoaded(sheetName);
        Map<String, Integer> indexMap = headerIndexMapPerSheet.get(sheetName);
        Integer index = indexMap.get(headerName);
        if (index == null) {
            throw new IllegalArgumentException("Header '" + headerName + "' not found in sheet '" + sheetName + "'");
        }
        return index;
    }

    private void ensureHeadersLoaded(String sheetName) {
        if (!headerIndexMapPerSheet.containsKey(sheetName)) {
            loadHeadersForSheet(sheetName);
        }
    }

    private String columnIndexToLetter(int index) {
        StringBuilder sb = new StringBuilder();
        while (index >= 0) {
            sb.insert(0, (char) ('A' + (index % 26)));
            index = (index / 26) - 1;
        }
        return sb.toString();
    }
}