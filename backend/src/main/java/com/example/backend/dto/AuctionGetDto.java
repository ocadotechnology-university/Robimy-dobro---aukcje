package com.example.backend.dto;

import com.example.backend.model.AuctionStatus;
import lombok.Getter;
import lombok.Setter;

import java.util.UUID;

@Getter
@Setter
public class AuctionGetDto {
    private UUID id;
    private Long publicId;
    private String title;
    private String date;
    private String city;
    private String description;
    private AuctionStatus status;
    private String supplier;
    private String winner;
    private Double price;
    private String fileId;
    private Boolean isFollowed;
    private String slackUrl;
    private Boolean isSupplier;
    private Boolean wantsToBeModerator;
}