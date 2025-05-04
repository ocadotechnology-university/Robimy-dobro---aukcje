package com.example.backend.util;

import com.example.backend.model.Auction;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class CreateRowInGoogleSheets {
    public String makeNotNull(Object value) {
        return value != null ? value.toString() : "";
    }
    private Object makeNotNullForNumbers(Object value) {
        return value != null ? value : "";
    }
    public List<Object> createRow(Auction auction) {
        return Arrays.asList(
                makeNotNull(auction.getId()),
                makeNotNull(auction.getModeratorEmail()),
                makeNotNull(auction.getAuctionDate()),
                makeNotNull(auction.getAuctionDate()),
                makeNotNull(auction.getSupplierName()),
                makeNotNull(auction.getSupplierEmail()),
                makeNotNull(auction.getTitle()),
                makeNotNull(auction.getDescription()),
                makeNotNull(auction.getFileId()),
                makeNotNull(auction.getCity()),
                makeNotNullForNumbers(auction.getStartingPrice()),
                makeNotNull(auction.getFollowers()),
                makeNotNullForNumbers(auction.getFollowersCount()),
                makeNotNull(auction.getSlackThreadLink()),
                makeNotNullForNumbers(auction.getCurrentBid()),
                makeNotNull(auction.getWinner())
        );
    }
}
