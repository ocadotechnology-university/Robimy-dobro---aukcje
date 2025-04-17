package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class AuctionCreateDto {
    private String title;
    private String description;
    private double startingPrice;
    private boolean wantsToBeModerator;
    private String city;
    private LocalDate preferredAuctionDate;
    private String imageUrl;
}
