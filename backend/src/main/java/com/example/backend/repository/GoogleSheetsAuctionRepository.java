package com.example.backend.repository;

import com.example.backend.model.Auction;
import com.example.backend.service.GoogleSheetsService;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Repository
public class GoogleSheetsAuctionRepository implements AuctionRepository {
    private final GoogleSheetsService googleSheetsService;

    public GoogleSheetsAuctionRepository(GoogleSheetsService googleSheetsService) {
        this.googleSheetsService = googleSheetsService;
    }

    @Override
    public void save(Auction auction) throws IOException {
    }
}