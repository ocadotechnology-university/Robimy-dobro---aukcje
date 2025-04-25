package com.example.backend.repository;

import com.example.backend.model.Auction;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public interface AuctionRepository {
    void save(Auction auction) throws IOException;

    List<Auction> findAllByFiltersAndUser(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String userEmail) throws IOException;
}