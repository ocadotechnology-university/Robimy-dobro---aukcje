package com.example.backend.model;

import com.example.backend.util.MimeTypeDetector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public record ImageData(byte[] content, MediaType mediaType) {
    private static final Logger logger = LoggerFactory.getLogger(ImageData.class);
    public static ImageData fromMultipartFile(MultipartFile file) throws IOException {
        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException("Uploaded file is null or empty");
        }

        byte[] content;
        try {
            content = file.getBytes();
        } catch (IOException e) {
            logger.error("Failed to read file bytes", e);
            throw e;
        }

        MediaType mediaType;
        if (file.getContentType() != null) {
            logger.info("Parsing file " + file.getOriginalFilename());
            mediaType = MediaType.parseMediaType(file.getContentType());
        } else {
            mediaType = MimeTypeDetector.detectImageType(content);
        }

        return new ImageData(content, mediaType);
    }
}
