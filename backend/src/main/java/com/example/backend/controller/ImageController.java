package com.example.backend.controller;

import com.example.backend.model.ImageData;
import com.example.backend.service.GoogleDriveService;
import com.example.backend.service.ImageCacheService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {
    private static final Logger logger = LoggerFactory.getLogger(ImageController.class);
    private final ImageCacheService imageCacheService;
    private final GoogleDriveService googleDriveService;

    public ImageController(ImageCacheService imageCacheService, GoogleDriveService googleDriveService) {
        this.imageCacheService = imageCacheService;
        this.googleDriveService = googleDriveService;
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileId) throws IOException {
        if(!imageCacheService.contains(fileId)){
            logger.info("Cache miss for fileId: {}. Fetching from Google Drive.", fileId);
            ImageData imageData = googleDriveService.downloadFile(fileId);

            if( imageData == null || imageData.content().length == 0 ){
                logger.warn("File not found or empty for fileId: {}", fileId);
                return ResponseEntity.notFound().build();
            }

            imageCacheService.put(fileId, imageData);
            logger.info("File cached for fileId: {}", fileId);
        } else {
            logger.info("Image taken from cache: {}", fileId);
        }
        ImageData imageData = imageCacheService.get(fileId);

        return ResponseEntity.ok()
                .contentType(imageData.mediaType())
                .body(imageData.content());
    }
}
