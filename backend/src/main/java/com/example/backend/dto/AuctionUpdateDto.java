package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuctionUpdateDto {
    private Boolean wantsToBeModerator;
    private String title;
    private String description;
    private String fileId;
    private String AuctionDate;
    private String city;
    private Double startingPrice;
}
