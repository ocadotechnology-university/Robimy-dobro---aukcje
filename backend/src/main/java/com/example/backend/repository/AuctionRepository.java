package com.example.backend.repository;

import com.example.backend.model.Auction;

import java.io.IOException;

public interface AuctionRepository {
    void save(Auction auction) throws IOException;
}