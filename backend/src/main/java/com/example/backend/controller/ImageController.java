package com.example.backend.controller;

import com.example.backend.model.ImageData;
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

    public ImageController(ImageCacheService imageCacheService) {
        this.imageCacheService = imageCacheService;
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
            logger.error("Internal server error for fileId: {}", fileId);
            return ResponseEntity.status(500).build();
        }
    }
}
