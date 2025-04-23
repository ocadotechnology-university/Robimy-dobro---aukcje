package com.example.backend.repository;

import com.example.backend.model.Auction;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public interface AuctionRepository {
    void save(Auction auction) throws IOException;

    List<Auction> findAllByFiltersAndUser(ArrayList<String> statuses, boolean myAuctions, boolean followed, ArrayList<String> dates, String userEmail) throws IOException;
}