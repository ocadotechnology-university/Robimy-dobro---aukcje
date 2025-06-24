package com.example.backend.service;

import com.example.backend.model.ImageData;
import com.example.backend.repository.GoogleDriveLocalDriveImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final GoogleDriveLocalDriveImageRepository googleDriveLocalDriveImageRepository;

    public ImageService(GoogleDriveLocalDriveImageRepository googleDriveLocalDriveImageRepository) {
        this.googleDriveLocalDriveImageRepository = googleDriveLocalDriveImageRepository;
    }

    public String save(MultipartFile file) throws IOException {
        return googleDriveLocalDriveImageRepository.save(file);
    }

    public ImageData get(String fileid) throws Exception {
        return googleDriveLocalDriveImageRepository.get(fileid);
    }
}
