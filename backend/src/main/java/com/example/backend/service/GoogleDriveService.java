package com.example.backend.service;

import com.example.backend.constants.CustomException;
import com.example.backend.model.ImageData;
import com.example.backend.util.GoogleApiConnector;
import com.example.backend.util.MimeTypeDetector;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.client.http.FileContent;
import io.github.cdimascio.dotenv.Dotenv;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;

@Service
public class GoogleDriveService {
    private static final Logger logger = LoggerFactory.getLogger(GoogleDriveService.class);
    private static final Dotenv dotenv = Dotenv.configure().load();
    private static final String FOLDER_ID = dotenv.get("GOOGLE_DRIVE_FOLDER_ID");

    public String uploadFile(MultipartFile multipartFile) throws IOException {
        Drive driveService = GoogleApiConnector.getDriveService();

        File fileMetadata = new File();
        fileMetadata.setName(multipartFile.getOriginalFilename());
        fileMetadata.setParents(Collections.singletonList(FOLDER_ID));

        java.io.File tempFile = java.io.File.createTempFile("upload-", multipartFile.getOriginalFilename());
        multipartFile.transferTo(tempFile);

        FileContent mediaContent = new FileContent(multipartFile.getContentType(), tempFile);

        logger.info("Uploading file: {}", multipartFile.getOriginalFilename());
        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        if (uploadedFile.getId() == null){
            logger.warn("GoogleDriveService failed to upload an image");
            throw new CustomException("GoogleDriveService failed to upload an image");
        }

        return uploadedFile.getId();
    }

    public ImageData downloadFile(String fileId) throws IOException {
        Drive driveService = GoogleApiConnector.getDriveService();

        byte[] image = driveService.files().get(fileId).executeMediaAsInputStream().readAllBytes();

        if (image == null) {
            logger.warn("File not found or empty for fileId: {}", fileId);
            throw new CustomException("File not found or empty for fileId: " + fileId);
        }

        logger.info("Image taken from googleDrive: {}", fileId);
        return new ImageData(
                image,
                MimeTypeDetector.detectImageType(image)
        );
    }

}