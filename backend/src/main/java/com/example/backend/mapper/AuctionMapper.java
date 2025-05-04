package com.example.backend.mapper;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;
import com.example.backend.util.DateTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@Component
public class AuctionMapper {
    @Autowired
    private DateTransformer dateTransformer;

    public AuctionGetDto mapToGetDto(Auction auction, String userEmail) {
        AuctionGetDto auctionGetDto = new AuctionGetDto();

        auctionGetDto.setId(auction.getId());
        auctionGetDto.setTitle(auction.getTitle());
        auctionGetDto.setCity(auction.getCity());
        auctionGetDto.setDate(auction.getAuctionDate() == null ? null : auction.getAuctionDate().toString());
        auctionGetDto.setDescription(auction.getDescription());
        auctionGetDto.setFileID(auction.getFileId());
        auctionGetDto.setSlackUrl(auction.getSlackThreadLink());
        auctionGetDto.setSupplier(auction.getSupplierName());
        auctionGetDto.setWinner(auction.getWinner());
        auctionGetDto.setPrice(auction.getCurrentBid() == null ? auction.getStartingPrice() : auction.getCurrentBid());
        auctionGetDto.setIsFollowed(auction.getFollowers() != null && auction.getFollowers().contains(userEmail));
        auctionGetDto.setIsSupplier(userEmail != null && userEmail.equals(auction.getSupplierEmail()));
        auctionGetDto.setStatus(determineStatus(auction));

        return auctionGetDto;
    }

    private AuctionStatus determineStatus(Auction auction) {
        return AuctionStatus.NOT_STARTED; // TODO: Implement logic to determine auction status
    }

    public Auction mapFromCreateDtoToAuction(AuctionCreateDto auctionCreateDto, String userEmail, String userName) {
        String moderatorEmail = null;

        if(auctionCreateDto.getWantsToBeModerator()) {
            moderatorEmail = userEmail;
        }

        return Auction.builder()
                .id(UUID.randomUUID())
                .moderatorEmail(moderatorEmail)
                .supplierEmail(userEmail)
                .supplierName(userName)
                .title(auctionCreateDto.getTitle())
                .description(auctionCreateDto.getDescription())
                .fileId(auctionCreateDto.getFileId())
                .city(auctionCreateDto.getCity())
                .startingPrice(auctionCreateDto.getStartingPrice())
                .currentBid(auctionCreateDto.getStartingPrice())
                .auctionDate(dateTransformer.transformDate(auctionCreateDto.getAuctionDate()))
                .followers(new ArrayList<>())
                .followersCount(0)
                .build();
    }

    public Auction mapFromAuctionToUpdateDto(Auction auction, String userEmail) {


        return null;
    }
    public Auction mapFromUpdateDtoToAuction(Auction auction, AuctionUpdateDto auctionUpdateDto, String userEmail, String userName) {
        String moderatorEmail = auction.getModeratorEmail();
        LocalDate date = auction.getAuctionDate();

        if(auctionUpdateDto.getWantsToBeModerator()) {
            moderatorEmail = userEmail;
        }

        if(auctionUpdateDto.getAuctionDate() != "") {
            date = dateTransformer.transformDate(auctionUpdateDto.getAuctionDate());
        }

        return Auction.builder()
                .id(auction.getId())
                .moderatorEmail(moderatorEmail)
                .supplierEmail(userEmail)
                .supplierName(userName)
                .title(auctionUpdateDto.getTitle())
                .description(auctionUpdateDto.getDescription())
                .fileId(auctionUpdateDto.getFileId())
                .city(auctionUpdateDto.getCity())
                .startingPrice(auctionUpdateDto.getStartingPrice())
                .currentBid(auctionUpdateDto.getStartingPrice())
                .auctionDate(date)
                .followers(auction.getFollowers())
                .followersCount(auction.getFollowersCount())
                .winner(auction.getWinner())
                .slackThreadLink(auction.getSlackThreadLink())
                .build();
    }
}