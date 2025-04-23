package com.example.backend.service;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class AuctionService {

    private final AuctionRepository auctionRepository;

    public AuctionService(AuctionRepository auctionRepository) {
        this.auctionRepository = auctionRepository;
    }

    public void save(AuctionCreateDto auctionCreateDto) throws IOException {
        Auction auction = new Auction();

        auction.setTitle(auctionCreateDto.getTitle());
        auction.setDescription(auctionCreateDto.getDescription());
        auction.setImageUrl(auctionCreateDto.getImageUrl());
        auction.setCity(auctionCreateDto.getCity());
        auction.setStartingPrice(auctionCreateDto.getStartingPrice());
        auction.setCurrentBid(auctionCreateDto.getStartingPrice());
        auction.setPreferredAuctionDate(auctionCreateDto.getPreferredAuctionDate());

        auctionRepository.save(auction);
    }

    public List<AuctionGetDto> getFilteredAuctions(ArrayList<String> statuses, boolean myAuctions, boolean followed, ArrayList<String> dates, String userEmail) throws IOException {
        List<Auction> auctions = auctionRepository.findAllByFiltersAndUser(statuses, myAuctions, followed, dates, userEmail);
        return List.of();
    }
}