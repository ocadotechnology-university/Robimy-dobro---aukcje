package com.example.backend.service;

import com.example.backend.model.ImageData;
import com.example.backend.repository.ImageRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
public class ImageService {
    private final ImageRepository imageRepository;

    public ImageService(ImageRepository imageRepository) {
        this.imageRepository = imageRepository;
    }

    public String save(MultipartFile file) throws IOException {
        return imageRepository.save(file);
    }

    public ImageData get(String fileid) throws Exception {
        return imageRepository.get(fileid);
    }
}
