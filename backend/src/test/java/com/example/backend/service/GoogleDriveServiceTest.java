package com.example.backend.service;

import com.example.backend.constants.CustomException;
import com.example.backend.model.ImageData;
import com.google.api.client.http.FileContent;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class GoogleDriveServiceTest {
    @Mock
    private Drive driveService;

    @Mock
    private Drive.Files files;

    @Mock
    private Drive.Files.Get getRequest;

    @Mock
    private Drive.Files.Create createRequest;

    @InjectMocks
    private GoogleDriveService googleDriveService;

    private static final String TEST_FILE_ID = "test-file-id";
    private static final String TEST_FILE_NAME = "test.txt";
    private static final String TEST_CONTENT_TYPE = "text/plain";

    @Test
    void uploadFile_success() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(
                TEST_FILE_NAME,
                TEST_FILE_NAME,
                TEST_CONTENT_TYPE,
                "test data".getBytes()
        );
        File file = new File();
        file.setId(TEST_FILE_ID);
        when(driveService.files()).thenReturn(files);
        when(files.create(any(File.class), any(FileContent.class))).thenReturn(createRequest);
        when(createRequest.setFields("id")).thenReturn(createRequest);
        when(createRequest.execute()).thenReturn(file);

        String fileId = googleDriveService.uploadFile(multipartFile);

        assertEquals(TEST_FILE_ID, fileId);
    }

    @Test
    void uploadFile_Failure_ThrowsCustomException() throws IOException {
        MultipartFile multipartFile = new MockMultipartFile(
                TEST_FILE_NAME,
                TEST_FILE_NAME,
                TEST_CONTENT_TYPE,
                "test data".getBytes()
        );
        File uploadedFile = new File();

        when(driveService.files()).thenReturn(files);
        when(files.create(any(File.class), any(FileContent.class))).thenReturn(createRequest);
        when(createRequest.setFields("id")).thenReturn(createRequest);
        when(createRequest.execute()).thenReturn(uploadedFile);

        assertThrows(CustomException.class, () -> googleDriveService.uploadFile(multipartFile));
    }

    @Test
    void downloadFile_success() throws IOException {
        byte[] testData = new byte[]{(byte) 0x89, 'P', 'N', 'G', 0x0D, 0x0A, 0x1A, 0x0A};
        InputStream inputStream = new ByteArrayInputStream(testData);
        when(driveService.files()).thenReturn(files);
        when(files.get(TEST_FILE_ID)).thenReturn(getRequest);
        when(getRequest.executeMediaAsInputStream()).thenReturn(inputStream);

        ImageData imageData = googleDriveService.downloadFile(TEST_FILE_ID);

        assertArrayEquals(testData, imageData.content());
        assertEquals(MediaType.IMAGE_PNG, imageData.mediaType());
    }

    @Test
    void downloadFile_NotFound_ThrowsCustomException() throws IOException {
        InputStream emptyInputStream = new ByteArrayInputStream(new byte[0]);
        when(driveService.files()).thenReturn(files);
        when(files.get(TEST_FILE_ID)).thenReturn(getRequest);
        when(getRequest.executeMediaAsInputStream()).thenReturn(emptyInputStream);

        assertThrows(CustomException.class, () -> googleDriveService.downloadFile(TEST_FILE_ID));
    }
}