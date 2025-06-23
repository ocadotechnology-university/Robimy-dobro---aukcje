package com.example.backend.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Service
public class LocalDriveService {

    private static final String IMAGES_FOLDER = "Images";

    public void save(MultipartFile file, String fileid) {
        try {
            Path path = Paths.get(IMAGES_FOLDER);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            String originalFilename = file.getOriginalFilename();
            String extension = "";

            if(originalFilename != null && !originalFilename.contains(".")) {
                extension = originalFilename.substring(originalFilename.lastIndexOf("."));
                throw new RuntimeException("File is not an image");
            }

            String newFileName = fileid + extension;

            Path filePath = path.resolve(newFileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image inside local drive", e);
        }
    }
}
