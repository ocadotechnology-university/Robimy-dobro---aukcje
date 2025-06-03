package com.example.backend.util;

import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;

import java.time.LocalDateTime;

public class AuctionStatusResolver {
    public static AuctionStatus resolveStatus(Auction auction) {
        LocalDateTime now = LocalDateTime.now();

        if (auction.getAuctionStartDateTime() == null || auction.getAuctionEndDateTime() == null) {
            return AuctionStatus.NOT_STARTED;
        }

        if (now.isBefore(auction.getAuctionStartDateTime())) {
            return AuctionStatus.NOT_STARTED;
        } else if (now.isAfter(auction.getAuctionEndDateTime())) {
            return AuctionStatus.FINISHED;
        } else {
            return AuctionStatus.IN_PROGRESS;
        }
    }
}
