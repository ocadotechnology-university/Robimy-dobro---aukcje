package com.example.backend.util;

import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;

import java.util.List;

public class AuctionSorter {
    public static List<Auction> sortAuctions(List<Auction> auctions, String sortBy) {
        return auctions.stream()
                .sorted((auctionA, auctionB) -> {
                    boolean isAuctionAFinished = AuctionStatusResolver.resolveStatus(auctionA) == AuctionStatus.FINISHED;
                    boolean isAuctionBFinished = AuctionStatusResolver.resolveStatus(auctionB) == AuctionStatus.FINISHED;

                    if (isAuctionAFinished && !isAuctionBFinished) return 1;
                    if (!isAuctionAFinished && isAuctionBFinished) return -1;

                    boolean sortByPriceAscending = "priceAsc".equalsIgnoreCase(sortBy);
                    boolean sortByPriceDescending = "priceDesc".equalsIgnoreCase(sortBy);

                    if (!sortByPriceAscending && !sortByPriceDescending) {
                        return compareByPublicId(auctionA, auctionB);
                    }

                    Double valueOfAuctionA = auctionA.getCurrentBid() != null
                            ? auctionA.getCurrentBid()
                            : auctionA.getStartingPrice();

                    Double valueOfAuctionB = auctionB.getCurrentBid() != null
                            ? auctionB.getCurrentBid()
                            : auctionB.getStartingPrice();

                    boolean auctionAHasPrice = valueOfAuctionA != null;
                    boolean auctionBHasPrice = valueOfAuctionB != null;

                    if (auctionAHasPrice && !auctionBHasPrice) return -1;
                    if (!auctionAHasPrice && auctionBHasPrice) return 1;
                    if (!auctionAHasPrice && !auctionBHasPrice) {
                        return compareByPublicId(auctionA, auctionB);
                    }

                    int priceComparison = sortByPriceAscending
                            ? Double.compare(valueOfAuctionA, valueOfAuctionB)
                            : Double.compare(valueOfAuctionB, valueOfAuctionA);

                    return priceComparison != 0
                            ? priceComparison
                            : compareByPublicId(auctionA, auctionB);
                })
                .toList();
    }

    private static int compareByPublicId(Auction auctionA, Auction auctionB) {
        Long publicIdA = auctionA.getPublicId();
        Long publicIdB = auctionB.getPublicId();

        if (publicIdA == null && publicIdB == null) return 0;
        if (publicIdA == null) return 1;
        if (publicIdB == null) return -1;

        return publicIdA.compareTo(publicIdB);
    }
}
