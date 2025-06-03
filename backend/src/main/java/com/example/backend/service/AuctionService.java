package com.example.backend.service;

import com.example.backend.constants.CustomException;
import com.example.backend.constants.ErrorMessages;
import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.dto.PublicIdDto;
import com.example.backend.mapper.AuctionMapper;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.UUID;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;
    private final AuctionMapper auctionMapper;

    public AuctionService(AuctionRepository auctionRepository, AuctionMapper auctionMapper) {
        this.auctionRepository = auctionRepository;
        this.auctionMapper = auctionMapper;
    }

    public void save(AuctionCreateDto auctionCreateDto, String userEmail, String userName) throws IOException {
        auctionRepository.save(auctionMapper.mapFromCreateDtoToAuction(auctionCreateDto, userEmail, userName));
    }

    public void update(UUID auctionId, AuctionUpdateDto auctionUpdateDto, String userEmail, boolean isAdmin) throws IOException {
        Auction auction = auctionMapper.mapFromUpdateDtoToAuction(getAuctionById(auctionId), auctionUpdateDto, userEmail);

        if(!isAdmin && !auction.getSupplierEmail().equals(userEmail)) {
            throw new CustomException(ErrorMessages.NO_PERMISSION);
        }

        auctionRepository.update(auctionId, auction);
    }

    public void updatePublicId(UUID auctionId, PublicIdDto publicIdDto) throws IOException{
        auctionRepository.update(auctionId, auctionMapper.mapFromUpdatePublicIdToAuction(getAuctionById(auctionId), publicIdDto));
    }

    public Auction getAuctionById(UUID auctionId) throws IOException {
        return auctionRepository.findByAuctionId(auctionId);
    }

    public List<AuctionGetDto> getFilteredAuctions(List<String> statuses, boolean myAuctions, boolean followed, List<String> dates, String sortBy, String userEmail) throws IOException {
        List<Auction> auctions = auctionRepository.findAllByFiltersAndUser(statuses, myAuctions, followed, dates, sortBy, userEmail);

        return auctions.stream().map(auction -> auctionMapper.mapToGetDto(auction, userEmail)).toList();
    }

    public void followAuction(UUID auctionId, String userEmail) throws IOException {
        auctionRepository.follow(auctionId, userEmail);
    }

    public void unfollowAuction(UUID auctionId, String userEmail) throws IOException {
        auctionRepository.unfollow(auctionId, userEmail);
    }
}