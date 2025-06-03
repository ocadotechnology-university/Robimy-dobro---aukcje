package com.example.backend.exception;

import com.example.backend.controller.AuctionController;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger logger = LoggerFactory.getLogger(AuctionController.class);

    @ExceptionHandler(NotAuctionOwnerException.class)
    public ResponseEntity<String> handleNotAuctionOwner(NotAuctionOwnerException e) {
        logger.error("Error while editing the auction: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }

    @ExceptionHandler(AdminPermissionRequiredException.class)
    public ResponseEntity<String> handleAdminPermissionRequired(AdminPermissionRequiredException e) {
        logger.error("Error while editing the auction's ID: " + e.getMessage());
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
    }
}
