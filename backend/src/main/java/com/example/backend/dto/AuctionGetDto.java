package com.example.backend.dto;

import com.example.backend.model.AuctionStatus;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuctionGetDto {
    private String title;
    private String date;
    private String city;
    private String description;
    private AuctionStatus status;
    private String supplier;
    private String winner;
    private String price;
    private String imageUrl;
    private Boolean isFollowed;
    private String slackUrl;
    private Boolean isSupplier;
}