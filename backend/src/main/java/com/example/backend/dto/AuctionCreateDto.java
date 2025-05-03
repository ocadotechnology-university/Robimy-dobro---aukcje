package com.example.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDate;

@Getter
@Setter
public class AuctionCreateDto {
    private Boolean wantsToBeModerator;
    private String title;
    private String description;
    private String fileId;
    private String preferredAuctionDate;
    private String city;
    private Double startingPrice;
}