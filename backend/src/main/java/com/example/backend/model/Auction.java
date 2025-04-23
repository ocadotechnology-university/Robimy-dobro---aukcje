package com.example.backend.model;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
public class Auction {

    private UUID id;

    // Moderator
    private String moderatorEmail;

    // Owner
    private String supplierName;
    private String supplierEmail;

    // Dates
    private LocalDate preferredAuctionDate;
    private LocalDate auctionDate;

    // Details
    private String title;
    private String description;
    private String imageUrl;
    private String city;
    private double startingPrice;
    private double currentBid;
    private String winner;
    private String slackThreadLink;

    // Follows
    private List<String> followers;
    private int followersCount;

    public Auction() {
        this.id = UUID.randomUUID();
        this.followers = new ArrayList<>();
        this.followersCount = 0;
    }
}