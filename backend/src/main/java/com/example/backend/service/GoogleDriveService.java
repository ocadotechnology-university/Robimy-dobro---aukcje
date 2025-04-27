package com.example.backend.service;

import com.example.backend.util.GoogleApiConnector;
import com.google.api.services.drive.Drive;
import com.google.api.services.drive.model.File;
import com.google.api.client.http.FileContent;
import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GoogleDriveService {

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

        File uploadedFile = driveService.files().create(fileMetadata, mediaContent)
                .setFields("id")
                .execute();

        return "https://drive.google.com/uc?export=view&id=" + uploadedFile.getId();
    }

    public byte[] downloadFile(String fileId) throws IOException {
        Drive driveService = GoogleApiConnector.getDriveService();

        return driveService.files().get(fileId)
                .executeMediaAsInputStream()
                .readAllBytes();
    }

    public Map<String, byte[]> downloadAllFiles() throws IOException {
        Drive driveService = GoogleApiConnector.getDriveService();

        List<com.google.api.services.drive.model.File> files = driveService.files().list()
                .setQ("'" + FOLDER_ID + "' in parents and trashed=false")
                .setFields("files(id)")
                .execute()
                .getFiles();

        Map<String, byte[]> fileContents = new HashMap<>();

        for (com.google.api.services.drive.model.File file : files) {
            byte[] content = driveService.files().get(file.getId())
                    .executeMediaAsInputStream()
                    .readAllBytes();

            fileContents.put(file.getId(), content);
        }

        return fileContents;
    }
}