package com.example.backend.util;

import org.junit.jupiter.api.Test;
import org.springframework.http.MediaType;

import static org.junit.jupiter.api.Assertions.assertEquals;

class MimeTypeDetectorTest {
    @Test
    void testDetectJpeg() {
        byte[] jpegHeader = new byte[] {(byte) 0xFF, (byte) 0xD8};
        System.out.println(jpegHeader);
        assertEquals(MediaType.IMAGE_JPEG, MimeTypeDetector.detectImageType(jpegHeader));
    }

    @Test
    void testDetectPng() {
        byte[] pngHeader = new byte[] {(byte) 0x89, 0x50};
        assertEquals(MediaType.IMAGE_PNG, MimeTypeDetector.detectImageType(pngHeader));
    }

    @Test
    void testDetectGif() {
        byte[] gifHeader = new byte[] {0x47, 0x49};
        assertEquals(MediaType.IMAGE_GIF, MimeTypeDetector.detectImageType(gifHeader));
    }

    @Test
    void testUnknownSignature() {
        byte[] unknown = new byte[] {0x01, 0x02};
        assertEquals(MediaType.APPLICATION_OCTET_STREAM, MimeTypeDetector.detectImageType(unknown));
    }

    @Test
    void testTooShortArray() {
        byte[] tooShort = new byte[] {0x01};
        assertEquals(MediaType.APPLICATION_OCTET_STREAM, MimeTypeDetector.detectImageType(tooShort));
    }
}