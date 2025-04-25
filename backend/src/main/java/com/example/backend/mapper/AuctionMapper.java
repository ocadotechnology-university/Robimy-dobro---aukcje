package com.example.backend.mapper;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.UUID;

@Component
public class AuctionMapper {

    public AuctionGetDto mapToGetDto(Auction auction, String userEmail) {
        AuctionGetDto auctionGetDto = new AuctionGetDto();

        auctionGetDto.setTitle(auction.getTitle());
        auctionGetDto.setCity(auction.getCity());
        auctionGetDto.setDate(auction.getAuctionDate().toString());
        auctionGetDto.setDescription(auction.getDescription());
        auctionGetDto.setImageUrl(auction.getImageUrl());
        auctionGetDto.setSlackUrl(auction.getSlackThreadLink());
        auctionGetDto.setSupplier(auction.getSupplierName());
        auctionGetDto.setWinner(auction.getWinner());
        auctionGetDto.setPrice(auction.getCurrentBid().toString());
        auctionGetDto.setIsFollowed(auction.getFollowers() != null && auction.getFollowers().contains(userEmail));
        auctionGetDto.setIsSupplier(userEmail != null && userEmail.equals(auction.getSupplierEmail()));
        auctionGetDto.setStatus(determineStatus(auction));

        return auctionGetDto;
    }

    private AuctionStatus determineStatus(Auction auction) {
        return AuctionStatus.NOT_STARTED; // TODO: Implement logic to determine auction status
    }

    public Auction mapFromCreateDtoToAuction(AuctionCreateDto auctionCreateDto, String userEmail, String userName) {
        return Auction.builder()
                .id(UUID.randomUUID())
                .supplierEmail(userEmail)
                .supplierName(userName)
                .title(auctionCreateDto.getTitle())
                .description(auctionCreateDto.getDescription())
                .imageUrl(auctionCreateDto.getImageUrl())
                .city(auctionCreateDto.getCity())
                .startingPrice(auctionCreateDto.getStartingPrice())
                .currentBid(auctionCreateDto.getStartingPrice())
                .preferredAuctionDate(auctionCreateDto.getPreferredAuctionDate())
                .followers(new ArrayList<>())
                .followersCount(0)
                .build();
    }
}