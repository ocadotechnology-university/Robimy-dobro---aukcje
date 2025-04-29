package com.example.backend.util;

import org.springframework.http.MediaType;

public class MimeTypeDetector {
    public static MediaType detectImageType(byte[] bytes) {
        if (bytes.length > 4) {
            if ((bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xD8) {
                return MediaType.IMAGE_JPEG;
            } else if ((bytes[0] & 0xFF) == 0x89 && (bytes[1] & 0xFF) == 0x50) {
                return MediaType.IMAGE_PNG;
            } else if ((bytes[0] & 0xFF) == 0x47 && (bytes[1] & 0xFF) == 0x49) {
                return MediaType.IMAGE_GIF;
            }
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }
}
