package com.example.backend.service;

import com.example.backend.model.ImageData;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ImageCacheService {
    private final Map<String, ImageData> cache = new ConcurrentHashMap<>();

    public ImageData get(String fileId) {
        return cache.get(fileId);
    }

    public void put(String fileId, ImageData imageData) {
        cache.put(fileId, imageData);
    }

    public boolean contains(String fileId) {
        return cache.containsKey(fileId);
    }
}
