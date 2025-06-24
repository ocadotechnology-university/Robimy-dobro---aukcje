package com.example.backend.model;

import com.example.backend.util.MimeTypeDetector;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public record ImageData(byte[] content, MediaType mediaType) {
    public static ImageData fromMultipartFile(MultipartFile file) throws IOException {
        byte[] content = file.getBytes();

        MediaType mediaType;
        if (file.getContentType() != null) {
            mediaType = MediaType.parseMediaType(file.getContentType());
        } else {
            mediaType = MimeTypeDetector.detectImageType(content);
        }

        return new ImageData(content, mediaType);
    }
}
