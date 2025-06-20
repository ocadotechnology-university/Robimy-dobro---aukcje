package com.example.backend.repository;

import com.example.backend.gviz.GvizQueryBuilder;
import com.example.backend.gviz.GvizResponseParser;
import com.example.backend.service.GoogleSheetsHeaderMappingService;
import com.example.backend.service.GoogleSheetsService;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public class GoogleSheetsCityRepository implements CityRepository {
    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;
    private final GoogleSheetsHeaderMappingService googleSheetsHeaderMappingService;

    public GoogleSheetsCityRepository(
            GoogleSheetsService googleSheetsService,
            GvizResponseParser gvizResponseParser,
            GoogleSheetsHeaderMappingService googleSheetsHeaderMappingService
    ) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
        this.googleSheetsHeaderMappingService = googleSheetsHeaderMappingService;
    }

    @Override
    public List<String> getAllCities() throws IOException {
        String query = new GvizQueryBuilder(googleSheetsHeaderMappingService.getHeaderLetterMap("City"))
                .select("name")
                .build();

        String response = googleSheetsService.queryWithGviz(query, "City");
        return gvizResponseParser.parseSingleColumn(response);
    }
}