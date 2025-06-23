package com.example.backend.repository;

import com.example.backend.service.LocalDriveService;
import com.example.backend.service.GoogleDriveService;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Repository
public class ImageRepository {

    GoogleDriveService googleDriveService;
    LocalDriveService driveService;

    public ImageRepository(GoogleDriveService googleDriveService, LocalDriveService driveService) {
        this.googleDriveService = googleDriveService;
        this.driveService = driveService;
    }

    void save(MultipartFile file) throws IOException {
        String fileid = googleDriveService.uploadFile(file);
        driveService.save(file, fileid);
    }
}
