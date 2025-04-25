package com.example.backend.repository;

import com.example.backend.model.Auction;
//import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Repository
public interface AuctionRepository {
    void save(Auction auction) throws IOException;

    List<Auction> findAllByFiltersAndUser(ArrayList<String> statuses, Boolean myAuctions, Boolean followed, ArrayList<String> dates, String userEmail) throws IOException;
}