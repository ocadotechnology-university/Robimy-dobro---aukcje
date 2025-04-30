package com.example.backend.service;

import com.example.backend.controller.ImageController;
import com.example.backend.model.ImageData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ImageCacheService {
    private static final Logger logger = LoggerFactory.getLogger(ImageCacheService.class);
    private final Map<String, ImageData> cache = new ConcurrentHashMap<>();
    private final GoogleDriveService googleDriveService;

    public ImageCacheService(GoogleDriveService googleDriveService) {
        this.googleDriveService = googleDriveService;
    }

    public ImageData get(String fileId) throws IOException {
        if (contains(fileId)){
            logger.info("Image taken from cache: {}", fileId);
            return cache.get(fileId);
        }
        else {
            logger.info("Cache miss for fileId: {}. Fetching from Google Drive.", fileId);
            ImageData imageData = googleDriveService.downloadFile(fileId);
            put(fileId, imageData);
            return imageData;
        }
    }

    public void put(String fileId, ImageData imageData) {
        cache.put(fileId, imageData);
    }

    public boolean contains(String fileId) {
        return cache.containsKey(fileId);
    }
}
