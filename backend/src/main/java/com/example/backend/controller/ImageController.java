package com.example.backend.controller;

import com.example.backend.constants.CustomException;
import com.example.backend.model.ImageData;
import com.example.backend.service.GoogleDriveService;
import com.example.backend.service.ImageCacheService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping("/")
    public ResponseEntity<?> postImage(@RequestParam("file") MultipartFile multipartFile){
        try{
            String fileId = googleDriveService.uploadFile(multipartFile);
            return ResponseEntity.status(201).body(fileId);
        } catch (CustomException e){
            return ResponseEntity.status(500).body(e.getMessage());
        } catch (IOException e){
            logger.error("Internal server error for posting an image");
            return ResponseEntity.status(500).body("Internal server error.");
        }
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getImage(@PathVariable String fileId){
        try {
            ImageData image = imageCacheService.get(fileId);
            return ResponseEntity.ok().contentType(image.mediaType()).body(image.content());
        }catch (CustomException e){
            return ResponseEntity.status(404).body("File not found or empty");
        }catch (IOException e){
            logger.error("Internal server error for getting fileId: {}", fileId);
            return ResponseEntity.status(500).body("Internal server error.");
        }
    }
}
