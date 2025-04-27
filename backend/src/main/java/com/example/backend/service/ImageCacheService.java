package com.example.backend.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ImageCacheService {
    private final Map<String, byte[]> cache = new ConcurrentHashMap<>();

    public byte[] get(String fileId) {
        return cache.get(fileId);
    }

    public void put(String fileId, byte[] image) {
        cache.put(fileId, image);
    }

    public boolean contains(String fileId) {
        return cache.containsKey(fileId);
    }
}
