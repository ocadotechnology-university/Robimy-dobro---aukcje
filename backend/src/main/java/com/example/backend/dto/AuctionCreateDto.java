package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class AuctionCreateDto {
    private String title;
    private String description;
    private double startingPrice;
    private String city;
    private LocalDate preferredAuctionDate;
    private String imageUrl;
}
