package com.example.backend.mapper;

import com.example.backend.dto.AuctionGetDto;
import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;
import org.springframework.stereotype.Component;

@Component
public class AuctionMapper {

    public AuctionGetDto mapToGetDto(Auction auction, String userEmail) {
        AuctionGetDto auctionGetDto = new AuctionGetDto();

        auctionGetDto.setTitle(auction.getTitle());
        auctionGetDto.setCity(auction.getCity());
        auctionGetDto.setDate(auction.getAuctionDate() != null ? auction.getAuctionDate().toString() : "");
        auctionGetDto.setDescription(auction.getDescription());
        auctionGetDto.setImageUrl(auction.getImageUrl());
        auctionGetDto.setSlackUrl(auction.getSlackThreadLink());
        auctionGetDto.setSupplier(auction.getSupplierName());
        auctionGetDto.setWinner(auction.getWinner());
        auctionGetDto.setPrice(auction.getCurrentBid() == 0.0 ? String.valueOf(auction.getCurrentBid()) : String.valueOf(auction.getStartingPrice()));
        auctionGetDto.setIsFollowed(auction.getFollowers() != null && auction.getFollowers().contains(userEmail));
        auctionGetDto.setIsSupplier(userEmail != null && userEmail.equals(auction.getSupplierEmail()));
        auctionGetDto.setStatus(determineStatus(auction));

        return auctionGetDto;
    }

    private AuctionStatus determineStatus(Auction auction) {
        return AuctionStatus.NOT_STARTED; // TODO: Implement logic to determine auction status
    }
}