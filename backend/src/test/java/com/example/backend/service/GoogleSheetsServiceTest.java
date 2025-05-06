package com.example.backend.service;

import com.google.api.services.sheets.v4.Sheets;
import com.google.api.services.sheets.v4.model.ValueRange;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.IOException;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GoogleSheetsServiceTest {
    @Mock
    private Sheets sheetsService;

    @Mock
    private Sheets.Spreadsheets spreadsheets;

    @Mock
    private Sheets.Spreadsheets.Values values;

    @Mock
    private Sheets.Spreadsheets.Values.Get getRequest;

    @Mock
    private Sheets.Spreadsheets.Values.Append appendRequest;

    @Mock
    private Sheets.Spreadsheets.Values.Update updateRequest;

    @InjectMocks
    private GoogleSheetsService googleSheetsService;

    @Test
    void readAll_WhenDataExists_ReturnsData() throws IOException {
        List<List<Object>> mockData = Arrays.asList(
                Arrays.asList("Column1", "Column2"),
                Arrays.asList("Data1", "Data2")
        );
        ValueRange mockResponse = new ValueRange().setValues(mockData);
        when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        when(spreadsheets.values()).thenReturn(values);
        when(values.get(any(), any())).thenReturn(getRequest);
        when(getRequest.execute()).thenReturn(mockResponse);

        List<List<Object>> result = googleSheetsService.readAll("Sheet1");

        assertEquals(mockData.size(), result.size());
        assertEquals("Column1", result.get(0).get(0));
        verify(getRequest).execute();
    }

    @Test
    void readAll_WhenNoDataExists_ReturnsEmptyList() throws IOException {
        List<List<Object>> mockData = Collections.emptyList();
        ValueRange mockResponse = new ValueRange().setValues(mockData);
        when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        when(spreadsheets.values()).thenReturn(values);
        when(values.get(any(), any())).thenReturn(getRequest);
        when(getRequest.execute()).thenReturn(mockResponse);

        List<List<Object>> result = googleSheetsService.readAll("Sheet1");

        assertTrue(result.isEmpty());
        verify(getRequest).execute();
    }

    @Test
    void appendRow_success() throws IOException {
        List<List<Object>> mockData = Arrays.asList(
                Arrays.asList("Column1", "Column2"),
                Arrays.asList("Data1", "Data2")
        );
        when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        when(spreadsheets.values()).thenReturn(values);
        when(values.append(any(), any(), any())).thenReturn(appendRequest);
        when(appendRequest.setValueInputOption(eq("RAW"))).thenReturn(appendRequest);
        when(appendRequest.setInsertDataOption(eq("INSERT_ROWS"))).thenReturn(appendRequest);

        googleSheetsService.appendRow("Sheet1", mockData);

        verify(values).append(any(), any(),
                argThat(body ->
                        body.getValues().equals(mockData)
                ));
        verify(appendRequest).execute();
    }

    @Test
    void updateCellValue_success() throws IOException {
        String mockData = "testData";
        ValueRange expectedResponse = new ValueRange().setValues(List.of(List.of(mockData)));
        when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        when(spreadsheets.values()).thenReturn(values);
        when(values.update(any(), any(), any())).thenReturn(updateRequest);
        when(updateRequest.setValueInputOption(eq("RAW"))).thenReturn(updateRequest);

        googleSheetsService.updateCellValue("Sheet1", 1, 1, mockData);

        verify(values).update(any(), any(),
                argThat(body ->
                        body.getValues().equals(expectedResponse.getValues())
                ));
        verify(updateRequest).execute();
    }

    @Test
    void updateRow_success() throws IOException {
        List<Object> mockData = Arrays.asList("Column1", "Column2");
        ValueRange expectedResponse = new ValueRange().setValues(List.of(mockData));
        when(sheetsService.spreadsheets()).thenReturn(spreadsheets);
        when(spreadsheets.values()).thenReturn(values);
        when(values.update(any(), any(), any())).thenReturn(updateRequest);
        when(updateRequest.setValueInputOption(eq("USER_ENTERED"))).thenReturn(updateRequest);

        googleSheetsService.updateRow("Sheet1", 1, mockData);

        verify(values).update(any(), any(),
                argThat(body ->
                        body.getValues().equals(expectedResponse.getValues())
                ));
        verify(updateRequest).execute();
    }

}