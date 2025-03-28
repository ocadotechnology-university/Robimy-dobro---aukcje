package com.example.backend.service;
import com.example.backend.util.GoogleSheetsConnector;

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
    private static MockedStatic<GoogleSheetsConnector> mockedGoogleSheetsConnector;

    @BeforeAll
    static void init() {
        // Initialize static mocking once before all tests
        mockedGoogleSheetsConnector = mockStatic(GoogleSheetsConnector.class);
    }

    @BeforeEach
    void setUp() throws IOException {
        // Mock the static method
        mockedGoogleSheetsConnector.when(GoogleSheetsConnector::getSheetsService).thenReturn(sheetsService);

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
    void readSheet() throws IOException {
        String range = "Sheet1!A1:B2";
        List<List<Object>> mockData = Arrays.asList(
                Arrays.asList("Name", "Surname"),
                Arrays.asList("Mateusz", "Bukowski")
        );

        ValueRange mockResponse = new ValueRange().setValues(mockData);

        when(spreadsheetsValues.get(anyString(), eq(range))).thenReturn(mockGetRequest);
        when(mockGetRequest.execute()).thenReturn(mockResponse);

        List<List<Object>> result = googleSheetsService.readSheet(range);

        assertEquals(mockData, result);
        verify(spreadsheetsValues).get(anyString(), eq(range));
    }

    @Test
    void writeToSheet() throws IOException {
        String range = "Sheet1!A1:B1";
        List<List<Object>> dataToWrite = Arrays.asList(
                Arrays.asList("Data1", "Data2")
        );

        when(spreadsheetsValues.update(anyString(), eq(range), any(ValueRange.class))).thenReturn(mockUpdateRequest);
        when(mockUpdateRequest.setValueInputOption("RAW")).thenReturn(mockUpdateRequest);
        when(mockUpdateRequest.execute()).thenReturn(null);

        googleSheetsService.writeToSheet(range, dataToWrite);

        verify(spreadsheetsValues).update(anyString(), eq(range), any(ValueRange.class));
        verify(mockUpdateRequest).setValueInputOption("RAW");
        verify(mockUpdateRequest).execute();
    }
}