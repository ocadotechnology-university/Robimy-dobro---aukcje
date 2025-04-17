package com.example.backend.repository;

import com.example.backend.dto.AuctionFiltersDto;
import com.example.backend.model.Auction;

import java.io.IOException;
import java.util.List;

public interface AuctionRepository {
    void save(Auction auction) throws IOException;

    List<Auction> findAllByFiltersAndUser(AuctionFiltersDto auctionFiltersDto) throws IOException;
}