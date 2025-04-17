package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuctionGetDto {
    private String title;
    private String date;
    private String city;
    private String description;
    private String status;
    private String supplier;
    private String winner;
    private String price;
    private String imageUrl;
    private boolean isFollowed;
    private String slackUrl;
    private boolean isSupplier;
}