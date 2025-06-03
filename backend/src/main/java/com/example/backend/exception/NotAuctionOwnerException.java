package com.example.backend.exception;

public class NotAuctionOwnerException extends RuntimeException {
    public NotAuctionOwnerException (String message) {
        super(message);
    }
}
