package com.example.backend.repository;

import com.example.backend.gviz.GvizQueryBuilder;
import com.example.backend.gviz.GvizResponseParser;
import com.example.backend.service.GoogleSheetsHeaderMappingService;
import com.example.backend.service.GoogleSheetsService;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Repository
public class GoogleSheetsDateRepository implements DateRepository {

    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;
    private final GoogleSheetsHeaderMappingService headerMappingService;

    public GoogleSheetsDateRepository(
            GoogleSheetsService googleSheetsService,
            GvizResponseParser gvizResponseParser,
            GoogleSheetsHeaderMappingService headerMappingService
    ) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
        this.headerMappingService = headerMappingService;
    }

    @Override
    public List<LocalDate> getAllDates() throws IOException {
        String query = new GvizQueryBuilder(headerMappingService.getHeaderLetterMap("Date"))
                .select("date")
                .build();

        String response = googleSheetsService.queryWithGviz(query, "Date");
        return gvizResponseParser.parseSingleDateColumn(response);
    }
}