package com.example.backend.util;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.MediaType;

public class MimeTypeDetector {
    private static final Logger logger = LoggerFactory.getLogger(MimeTypeDetector.class);
    public static MediaType detectImageType(byte[] bytes) {
        if (bytes.length >= 2) {
            if ((bytes[0] & 0xFF) == 0xFF && (bytes[1] & 0xFF) == 0xD8) {
                return MediaType.IMAGE_JPEG;
            } else if ((bytes[0] & 0xFF) == 0x89 && (bytes[1] & 0xFF) == 0x50) {
                return MediaType.IMAGE_PNG;
            } else if ((bytes[0] & 0xFF) == 0x47 && (bytes[1] & 0xFF) == 0x49) {
                return MediaType.IMAGE_GIF;
            } else {
                logger.warn("Unrecognized image signature: 0x{} 0x{}",
                        Integer.toHexString(bytes[0] & 0xFF),
                        Integer.toHexString(bytes[1] & 0xFF));
            }
        } else {
            logger.warn("Byte array too short to determine image type (length: {}).", bytes.length);
        }
        return MediaType.APPLICATION_OCTET_STREAM;
    }

    public static String mediaTypeToExtension(MediaType mediaType) {
        if (MediaType.IMAGE_JPEG.equals(mediaType)) {
            return ".jpg";
        } else if (MediaType.IMAGE_PNG.equals(mediaType)) {
            return ".png";
        } else if (MediaType.IMAGE_GIF.equals(mediaType)) {
            return ".gif";
        }
        return "";
    }
}
