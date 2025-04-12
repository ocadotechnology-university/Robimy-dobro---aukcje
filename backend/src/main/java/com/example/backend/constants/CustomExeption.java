package com.example.backend.constants;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
public class CustomExeption extends RuntimeException{
    public CustomExeption(String message) {
        super(message);
    }

    public CustomExeption(String message, Throwable cause) {
        super(message, cause);
    }
}
