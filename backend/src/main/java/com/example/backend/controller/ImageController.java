package com.example.backend.controller;

import com.example.backend.model.ImageData;
import com.example.backend.service.GoogleDriveService;
import com.example.backend.service.ImageCacheService;
import com.example.backend.util.MimeTypeDetector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping()
    public ResponseEntity<?> postImage(@RequestBody byte[] imageBytes){
        try{
            ImageData image = new ImageData(imageBytes, MimeTypeDetector.detectImageType(imageBytes));
            String fileId = googleDriveService.uploadFile(image);
            return ResponseEntity.ok().body(fileId);
        }catch (IOException e){
            logger.error("Internal server error for posting an image");
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileId){
        try{
            ImageData image = imageCacheService.get(fileId);
            if (image == null || image.content().length == 0 ){
                logger.warn("File not found or empty for fileId: {}", fileId);
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok().contentType(image.mediaType()).body(image.content());
        }catch (IOException e){
            logger.error("Internal server error for getting fileId: {}", fileId);
            return ResponseEntity.status(500).build();
        }
    }
}
