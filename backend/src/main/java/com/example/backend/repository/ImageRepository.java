package com.example.backend.repository;

import com.example.backend.exception.ImageNotFoundException;
import com.example.backend.model.ImageData;
import com.example.backend.service.LocalDriveService;
import com.example.backend.service.GoogleDriveService;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Repository
public class ImageRepository {

    GoogleDriveService googleDriveService;
    LocalDriveService localDriveService;

    public ImageRepository(GoogleDriveService googleDriveService, LocalDriveService localDriveService) {
        this.googleDriveService = googleDriveService;
        this.localDriveService = localDriveService;
    }

    public String save(MultipartFile file) throws IOException {
        String fileid = googleDriveService.uploadFile(file);
        ImageData imageData = ImageData.fromMultipartFile(file);
        localDriveService.save(imageData, fileid);
        return fileid;
    }

    public ImageData get(String fileid) throws Exception {
        try{
            return localDriveService.get(fileid);
        }catch (ImageNotFoundException e){
            ImageData imageData = googleDriveService.downloadFile(fileid);
            localDriveService.save(imageData, fileid);
            return imageData;
        }
    }
}
