package com.example.backend.controller;

import com.example.backend.service.GoogleDriveService;
import com.example.backend.service.ImageCacheService;
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
            byte[] image = googleDriveService.downloadFile(fileId);
            if(image == null) return ResponseEntity.status(204).body(null);
            else{
                imageCacheService.put(fileId, image);
                return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(image);
            }
        }
        else return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(imageCacheService.get(fileId));
    }
}
