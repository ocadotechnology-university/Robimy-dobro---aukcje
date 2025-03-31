package com.example.backend.service;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;

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
        auction.setPreferredAuctionDay(auctionCreateDto.getPreferredAuctionDate());

        auctionRepository.save(auction);
    }
}