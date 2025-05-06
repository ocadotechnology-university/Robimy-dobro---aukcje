package com.example.backend.service;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.dto.AuctionUpdateDto;
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

    public void update(UUID auctionId, AuctionUpdateDto auctionUpdateDto, String userEmail) throws IOException {
        auctionRepository.update(auctionId, auctionMapper.mapFromUpdateDtoToAuction(getAuctionById(auctionId), auctionUpdateDto, userEmail));
    }

    public Auction getAuctionById(UUID auctionId) throws IOException {
        return auctionRepository.findByAuctionId(auctionId);
    }

    public List<AuctionGetDto> getFilteredAuctions(List<String> statuses, boolean myAuctions, boolean followed, List<String> dates, String userEmail) throws IOException {
        List<Auction> auctions = auctionRepository.findAllByFiltersAndUser(statuses, myAuctions, followed, dates, userEmail);

        return auctions.stream().map(auction -> auctionMapper.mapToGetDto(auction, userEmail)).toList();
    }

    public void followAuction(UUID auctionId, String userEmail) throws IOException {
        auctionRepository.follow(auctionId, userEmail);
    }

    public void unfollowAuction(UUID auctionId, String userEmail) throws IOException {
        auctionRepository.unfollow(auctionId, userEmail);
    }
}