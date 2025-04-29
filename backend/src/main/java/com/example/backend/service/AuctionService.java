package com.example.backend.service;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.mapper.AuctionMapper;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

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

    public List<AuctionGetDto> getFilteredAuctions(List<String> statuses, boolean myAuctions, boolean followed, List<String> dates, String userEmail) throws IOException {
        List<Auction> auctions = auctionRepository.findAllByFiltersAndUser(statuses, myAuctions, followed, dates, userEmail);

        return auctions.stream().map(auction -> auctionMapper.mapToGetDto(auction, userEmail)).toList();
    }
}