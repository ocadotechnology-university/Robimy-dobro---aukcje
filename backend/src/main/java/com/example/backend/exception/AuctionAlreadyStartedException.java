package com.example.backend.exception;

public class AuctionAlreadyStartedException extends RuntimeException {
    public AuctionAlreadyStartedException(String message) {
        super(message);
    }
}