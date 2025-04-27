package com.example.backend.service;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class ImageCacheService {
    private final Map<String, byte[]> cache = new ConcurrentHashMap<>();
    private final GoogleDriveService googleDriveService;

    public ImageCacheService(GoogleDriveService googleDriveService) {
        this.googleDriveService = googleDriveService;
    }

    @PostConstruct
    public void onStart(){
        try {
            Map<String, byte[]> images = googleDriveService.downloadAllFiles();
            for (Map.Entry<String, byte[]> entry : images.entrySet()) {
                cache.put(entry.getKey(), entry.getValue());
            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
        }
    }

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
