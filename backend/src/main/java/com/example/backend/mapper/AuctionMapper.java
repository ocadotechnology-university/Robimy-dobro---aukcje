package com.example.backend.mapper;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.dto.PublicIdDto;
import com.example.backend.model.Auction;
import com.example.backend.util.AuctionStatusResolver;
import com.example.backend.util.DateTransformer;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.UUID;

@Component
public class AuctionMapper {
    private final DateTransformer dateTransformer;

    public AuctionMapper(DateTransformer dateTransformer) {
        this.dateTransformer = dateTransformer;
    }

    public AuctionGetDto mapToGetDto(Auction auction, String userEmail) {
        AuctionGetDto auctionGetDto = new AuctionGetDto();

        auctionGetDto.setId(auction.getId());
        auctionGetDto.setPublicId(auction.getPublicId());
        auctionGetDto.setTitle(auction.getTitle());
        auctionGetDto.setCity(auction.getCity());
        auctionGetDto.setDate(auction.getAuctionDate() == null ? null : auction.getAuctionDate().toString());
        auctionGetDto.setDescription(auction.getDescription());
        auctionGetDto.setFileId(auction.getFileId());
        auctionGetDto.setSlackUrl(auction.getSlackThreadLink());
        auctionGetDto.setSupplierEmail(auction.getSupplierEmail());
        auctionGetDto.setSupplier(auction.getSupplierName());
        auctionGetDto.setWinner(auction.getWinner());
        auctionGetDto.setPrice(auction.getCurrentBid() == null ? auction.getStartingPrice() : auction.getCurrentBid());
        auctionGetDto.setIsFollowed(auction.getFollowers() != null && auction.getFollowers().contains(userEmail));
        auctionGetDto.setIsSupplier(userEmail != null && userEmail.equals(auction.getSupplierEmail()));
        auctionGetDto.setStatus(AuctionStatusResolver.resolveStatus(auction));
        auctionGetDto.setHasBids(auction.getCurrentBid() != null);
        auctionGetDto.setWantsToBeModerator(auction.getSupplierEmail() != null && auction.getSupplierEmail().equals(auction.getModeratorEmail()));
        return auctionGetDto;
    }

    public Auction mapFromCreateDtoToAuction(AuctionCreateDto auctionCreateDto, String userEmail, String userName) {
        String moderatorEmail = null;

        if (auctionCreateDto.getWantsToBeModerator()) {
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

    public Auction mapFromUpdateDtoToAuction(Auction auction, AuctionUpdateDto auctionUpdateDto, String userEmail) {
        String moderatorEmail = auction.getModeratorEmail();
        LocalDate date = dateTransformer.transformDate(auctionUpdateDto.getAuctionDate());

        if (auctionUpdateDto.getWantsToBeModerator()) {
            moderatorEmail = userEmail;
        } else {
            if (moderatorEmail != null && moderatorEmail.equals(auction.getSupplierEmail())) moderatorEmail = "";
        }

        return Auction.builder()
                .id(auction.getId())
                .publicId(auction.getPublicId())
                .moderatorEmail(moderatorEmail)
                .supplierEmail(auction.getSupplierEmail())
                .supplierName(auction.getSupplierName())
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

    public Auction mapFromUpdatePublicIdToAuction(Auction auction, PublicIdDto publicIdDto) {

        return Auction.builder()
                .id(auction.getId())
                .publicId(publicIdDto.getPublicId())
                .moderatorEmail(auction.getModeratorEmail())
                .supplierEmail(auction.getSupplierEmail())
                .supplierName(auction.getSupplierName())
                .title(auction.getTitle())
                .description(auction.getDescription())
                .fileId(auction.getFileId())
                .city(auction.getCity())
                .startingPrice(auction.getStartingPrice())
                .currentBid(auction.getStartingPrice())
                .auctionDate(auction.getAuctionDate())
                .followers(auction.getFollowers())
                .followersCount(auction.getFollowersCount())
                .winner(auction.getWinner())
                .slackThreadLink(auction.getSlackThreadLink())
                .build();
    }
}