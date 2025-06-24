package com.example.backend.controller;

import com.example.backend.exception.CustomException;
import com.example.backend.model.ImageData;
import com.example.backend.service.ImageService;
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
    private final ImageService imageService;

    public ImageController(ImageService imageService) {
        this.imageService = imageService;
    }

    @PostMapping("/")
    public ResponseEntity<?> postImage(@RequestParam(value = "file", required = false) MultipartFile multipartFile){
        if (multipartFile == null || multipartFile.isEmpty()) {
            return ResponseEntity.ok("No image uploaded");
        }

        try {
            String fileId = imageService.save(multipartFile);
            return ResponseEntity.status(201).body(fileId);
        } catch (CustomException e) {
            return ResponseEntity.status(500).body(e.getMessage());
        } catch (IOException e) {
            logger.error("Internal server error for posting an image");
            return ResponseEntity.status(500).body("Internal server error.");
        }
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<?> getImage(@PathVariable String fileId){
        try {
            ImageData image = imageService.get(fileId);
            return ResponseEntity.ok().contentType(image.mediaType()).body(image.content());
        }catch (CustomException e){
            return ResponseEntity.status(404).body("File not found or empty");
        }catch (IOException e){
            logger.error("Internal server error for getting fileId: {}", fileId);
            return ResponseEntity.status(500).body("Internal server error.");
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
