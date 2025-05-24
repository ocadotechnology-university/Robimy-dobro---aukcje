package com.example.backend.service;

import jakarta.annotation.PostConstruct;
import lombok.Getter;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoogleSheetsHeaderMappingService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleSheetsHeaderMappingService.class);

    private final GoogleSheetsService sheetsService;
    @Getter
    private final Map<String, Integer> headerIndexMap = new HashMap<>();
    @Getter
    private final Map<String, String> headerLetterMap = new HashMap<>();

    public GoogleSheetsHeaderMappingService(GoogleSheetsService sheetsService) {
        this.sheetsService = sheetsService;
    }

    @PostConstruct
    public void loadHeaderMappingsFromSheet() {
        try {
            List<List<Object>> rows = sheetsService.readAll("Auction");
            if (!rows.isEmpty()) {
                List<Object> headers = rows.get(0);
                for (int i = 0; i < headers.size(); i++) {
                    String header = headers.get(i).toString().trim();
                    headerIndexMap.put(header, i);
                    headerLetterMap.put(header, columnIndexToLetter(i));
                }
                logger.info("Loaded {} headers from sheet: {}", headers.size(), headers);
            } else {
                logger.warn("No headers found in sheet 'Auction'");
            }
        } catch (IOException e) {
            logger.error("Failed to initialize Google Sheets header mappings", e);
            throw new RuntimeException("Failed to initialize Google Sheets header mappings", e);
        }
    }

    public int getColumnIndex(String headerName) {
        Integer index = headerIndexMap.get(headerName);
        if (index == null) {
            throw new IllegalArgumentException("Header not found: " + headerName);
        }
        return index;
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