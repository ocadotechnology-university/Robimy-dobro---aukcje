package com.example.backend.model;

import org.springframework.http.MediaType;

public record ImageData(byte[] content, MediaType mediaType) {}
