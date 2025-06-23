package com.example.backend.service;

import com.example.backend.exception.ImageNotFoundException;
import com.example.backend.model.ImageData;
import com.example.backend.util.MimeTypeDetector;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.http.MediaType;

import java.io.IOException;
import java.nio.file.*;

import static com.example.backend.util.MimeTypeDetector.mediaTypeToExtension;

@Service
public class LocalDriveService {
    private static final String IMAGES_FOLDER = "Images";
    private static final Logger logger = LoggerFactory.getLogger(LocalDriveService.class);

    public void save(ImageData imageData, String fileid) {
        try {
            Path path = Paths.get(IMAGES_FOLDER);

            if (!Files.exists(path)) {
                Files.createDirectories(path);
            }

            String extension = mediaTypeToExtension(imageData.mediaType());

            if(extension.isEmpty()) {
                logger.error("Unsupported media type: {}", imageData.mediaType());
                throw new RuntimeException("Unsupported media type: " + imageData.mediaType());
            }

            String newFileName = fileid + extension;
            Path filePath = path.resolve(newFileName);

            logger.info("Saving image {} to {}", imageData.mediaType(), filePath.toAbsolutePath());
            Files.write(filePath, imageData.content(), StandardOpenOption.CREATE, StandardOpenOption.TRUNCATE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException("Failed to save image inside local drive", e);
        }
    }

    public ImageData get(String fileid) throws Exception {
        Path dirPath = Paths.get(IMAGES_FOLDER);

        if (!Files.exists(dirPath)) {
            logger.info("Image {} not found in local drive", fileid);
            throw new ImageNotFoundException("Image path does not exist");
        }

        try (var stream = Files.list(dirPath)){
            Path filePath = stream
                    .filter(path -> path.getFileName().toString().startsWith(fileid))
                    .findFirst()
                    .orElseThrow(() -> new ImageNotFoundException("No image found with id: " + fileid));

            byte[] content = Files.readAllBytes(filePath);
            MediaType mediaType = MimeTypeDetector.detectImageType(content);
            logger.info("Image {} taken from local drive", fileid);
            return new ImageData(content, mediaType);
        } catch (IOException e) {
            throw new IOException("Failed to read image file", e);
        }
    }


}
