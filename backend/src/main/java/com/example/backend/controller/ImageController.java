package com.example.backend.controller;

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

    public ImageController(ImageCacheService imageCacheService) {
        this.imageCacheService = imageCacheService;
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getImage(@PathVariable String fieldId) {
        if(!imageCacheService.contains(fieldId)) return ResponseEntity.status(204).body(null);
        else return ResponseEntity.ok().header("Content-Type", "image/jpeg").body(imageCacheService.get(fieldId));
    }
}
