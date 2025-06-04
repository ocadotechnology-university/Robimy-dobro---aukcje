package com.example.backend.exception;

public class AdminPermissionRequiredException extends RuntimeException {
    public AdminPermissionRequiredException(String message) {
        super(message);
    }
}
