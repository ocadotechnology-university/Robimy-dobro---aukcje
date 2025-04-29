package com.example.backend.controller;

import com.example.backend.model.ImageData;
import com.example.backend.service.GoogleDriveService;
import com.example.backend.service.ImageCacheService;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/images")
public class ImageController {

    private final ImageCacheService imageCacheService;
    private final GoogleDriveService googleDriveService;

    public ImageController(ImageCacheService imageCacheService, GoogleDriveService googleDriveService) {
        this.imageCacheService = imageCacheService;
        this.googleDriveService = googleDriveService;
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fileId) throws IOException {
        if(!imageCacheService.contains(fileId)){
            ImageData imageData = googleDriveService.downloadFile(fileId);

            if( imageData == null || imageData.content().length == 0 ){
                return ResponseEntity.notFound().build();
            }

            imageCacheService.put(fileId, imageData);
        }
        ImageData imageData = imageCacheService.get(fileId);

        return ResponseEntity.ok()
                .contentType(imageData.mediaType())
                .body(imageData.content());
    }
}
