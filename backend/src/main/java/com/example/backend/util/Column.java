package com.example.backend.util;

public enum Column {
    ID("id"),
    PUBLIC_ID("publicId"),
    MODERATOR_EMAIL("moderatorEmail"),
    PREFERRED_DATE("preferredAuctionDate"),
    AUCTION_DATE("auctionDate"),
    SUPPLIER_NAME("supplierName"),
    SUPPLIER_EMAIL("supplierEmail"),
    TITLE("title"),
    DESCRIPTION("description"),
    IMAGE_URL("imageUrl"),
    CITY("city"),
    STARTING_PRICE("startingPrice"),
    FOLLOWERS("followers"),
    FOLLOWERS_COUNT("followersCount"),
    SLACK_THREAD("slackThreadLink"),
    CURRENT_BID("currentBid"),
    WINNER("winner"),
    START_DATETIME("startDateTime"),
    END_DATETIME("endDateTime");

    public final String label;

    Column(String label) {
        this.label = label;
    }
}