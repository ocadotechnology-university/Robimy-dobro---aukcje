package com.example.backend.service;
import com.example.backend.util.GoogleApiConnector;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import static org.junit.jupiter.api.Assertions.*;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import static org.mockito.Mockito.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@ExtendWith(MockitoExtension.class)
class GoogleSheetsServiceTest {

    @Mock
    private Sheets sheetsService;

    @Mock
    private Sheets.Spreadsheets spreadsheets;

    @Mock
    private Sheets.Spreadsheets.Values spreadsheetsValues;

    @Mock
    private Sheets.Spreadsheets.Values.Get mockGetRequest;

    @Mock
    private Sheets.Spreadsheets.Values.Update mockUpdateRequest;

    @InjectMocks
    private GoogleSheetsService googleSheetsService;
    private static MockedStatic<GoogleApiConnector> mockedGoogleSheetsConnector;

    @BeforeAll
    static void init() {
        // Initialize static mocking once before all tests
        mockedGoogleSheetsConnector = mockStatic(GoogleApiConnector.class);
    }

    @BeforeEach
    void setUp() throws IOException {
        // Mock the static method
        mockedGoogleSheetsConnector.when(GoogleApiConnector::getSheetsService).thenReturn(sheetsService);

        // Using lenient after normal when returned "unnecessaryStubbingException"
        lenient().when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        lenient().when(spreadsheets.values()).thenReturn(spreadsheetsValues);

        // Instantiate the service
        googleSheetsService = new GoogleSheetsService();
    }


    @AfterAll
    static void tearDown() {
        // Release static mock after all tests
        mockedGoogleSheetsConnector.close();
    }

    @Test
    void readAll() throws IOException {
        String range = "Sheet1!A1:B2";
        List<List<Object>> mockData = Arrays.asList(
                Arrays.asList("Name", "Surname"),
                Arrays.asList("Mateusz", "Bukowski")
        );

        ValueRange mockResponse = new ValueRange().setValues(mockData);

        when(spreadsheetsValues.get(anyString(), eq(range))).thenReturn(mockGetRequest);
        when(mockGetRequest.execute()).thenReturn(mockResponse);

        List<List<Object>> result = googleSheetsService.readAll(range);

        assertEquals(mockData, result);
        verify(spreadsheetsValues).get(anyString(), eq(range));
    }

}