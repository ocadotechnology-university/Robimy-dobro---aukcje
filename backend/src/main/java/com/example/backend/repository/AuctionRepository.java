package com.example.backend.repository;

import com.example.backend.model.Auction;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Repository
public interface AuctionRepository {
    void save(Auction auction) throws IOException;
    void update(UUID auctionId, Auction auction) throws IOException;
    Auction findByAuctionId(UUID auctionId) throws IOException;
    List<Auction> findAllByFiltersAndUser(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String userEmail) throws IOException;
    void follow(UUID auctionId, String userEmail) throws IOException;
    void unfollow(UUID auctionId, String userEmail) throws IOException;
}