package com.example.backend.service;

import com.example.backend.exception.ImageNotFoundException;
import com.example.backend.model.ImageData;
import com.example.backend.util.MimeTypeDetector;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.*;

@Service
public class LocalDriveService {

    private static final String IMAGES_FOLDER = "Images";

    public void save(ImageData imageData, String fileid) {
        try {
            Path path = Paths.get(IMAGES_FOLDER);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            String extension = mediaTypeToExtension(imageData.mediaType());

            if(extension.isEmpty()) {
                throw new RuntimeException("Unsupported media type: " + imageData.mediaType());
            }

            String newFileName = fileid + extension;
            Path filePath = path.resolve(newFileName);

            Files.write(filePath, imageData.content(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image inside local drive", e);
        }
    }

    public ImageData get(String fileid) throws Exception {
        Path dirPath = Paths.get(IMAGES_FOLDER).resolve(fileid);

        if (!Files.exists(dirPath)) {
            throw new ImageNotFoundException("Image path does not exist");
        }

        try (var stream = Files.list(dirPath)){
            Path filePath = stream
                    .filter(path -> path.getFileName().toString().startsWith(fileid))
                    .findFirst()
                    .orElseThrow(() -> new ImageNotFoundException("No image found with id: " + fileid));

            byte[] content = Files.readAllBytes(filePath);
            MediaType mediaType = MimeTypeDetector.detectImageType(content);
            return new ImageData(content, mediaType);
        } catch (IOException e) {
            throw new IOException("Failed to read image file", e);
        }
    }

    private String mediaTypeToExtension(MediaType mediaType) {
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
