package com.example.backend.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class AuctionFiltersDto {
    private List<String> statuses;
    private Boolean myAuctions;
    private Boolean followed;
    private List<String> dates;
}