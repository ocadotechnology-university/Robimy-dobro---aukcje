package com.example.backend.repository;

import com.example.backend.dto.AuctionFiltersDto;
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

    private String makeNotNull(Object value) {
        return value != null ? value.toString() : "";
    }

    @Override
    public void save(Auction auction) throws IOException {
        List<Object> row = Arrays.asList(
                makeNotNull(auction.getId()),
                makeNotNull(auction.getModeratorEmail()),
                makeNotNull(auction.getPreferredAuctionDay()),
                makeNotNull(auction.getAuctionDay()),
                makeNotNull(auction.getSupplierName()),
                makeNotNull(auction.getSupplierEmail()),
                makeNotNull(auction.getTitle()),
                makeNotNull(auction.getDescription()),
                makeNotNull(auction.getImageUrl()),
                makeNotNull(auction.getCity()),
                auction.getStartingPrice(),
                auction.getCurrentBid(),
                makeNotNull(auction.getWinner()),
                makeNotNull(auction.getSlackThreadLink())
        );

        googleSheetsService.appendRow("Auction", List.of(row));
    }

    @Override
    public List<Auction> findAllByFiltersAndUser(AuctionFiltersDto auctionFiltersDto) {
        // To be implemented
        return List.of();
    }
}