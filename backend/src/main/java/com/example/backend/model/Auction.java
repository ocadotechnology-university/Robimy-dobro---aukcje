package com.example.backend.model;

import lombok.Builder;
import lombok.Getter;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Getter
@Builder
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
    private String fileId;
    private String city;
    private Double startingPrice;
    private Double currentBid;
    private String winner;
    private String slackThreadLink;

    // Follows
    private List<String> followers;
    private Integer followersCount;
}