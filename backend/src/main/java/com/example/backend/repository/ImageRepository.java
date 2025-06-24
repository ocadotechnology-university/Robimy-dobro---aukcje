package com.example.backend.repository;

import com.example.backend.model.ImageData;
import org.springframework.stereotype.Repository;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Repository
public interface ImageRepository {
    String save(MultipartFile file) throws IOException;
    ImageData get(String fileid) throws Exception;
}
