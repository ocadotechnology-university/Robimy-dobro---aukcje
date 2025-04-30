package com.example.backend.repository;

import com.example.backend.model.Auction;
import com.example.backend.util.AuctionQuery;
import com.example.backend.service.GoogleSheetsService;
import com.example.backend.util.GvizResponseParser;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Repository
public class GoogleSheetsAuctionRepository implements AuctionRepository {
    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;

    public GoogleSheetsAuctionRepository(GoogleSheetsService googleSheetsService, GvizResponseParser gvizResponseParser) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
    }

    private String makeNotNull(Object value) {
        return value != null ? value.toString() : "";
    }

    @Override
    public void save(Auction auction) throws IOException {
        List<Object> row = Arrays.asList(
                makeNotNull(auction.getId()),
                makeNotNull(auction.getModeratorEmail()),
                makeNotNull(auction.getPreferredAuctionDate()),
                makeNotNull(auction.getAuctionDate()),
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
    public List<Auction> findAllByFiltersAndUser(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String userEmail) throws IOException {
        AuctionQuery auctionQuery = new AuctionQuery(statuses, myAuctions, followed, dates, userEmail);
        String queryWithFilters = auctionQuery.getQueryWithFilters();
        System.out.println(queryWithFilters);
        String response = googleSheetsService.queryWithGviz(queryWithFilters);
        List<Auction> auctions = gvizResponseParser.parse(response);
        return auctions;
    }
}