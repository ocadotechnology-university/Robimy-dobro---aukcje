package com.example.backend.controller;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping
    public ResponseEntity<?> saveAuction(@RequestBody AuctionCreateDto auctionCreateDto) throws IOException {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            String userName = SecurityContextHolder.getContext().getAuthentication().getName();
            auctionService.save(auctionCreateDto, userEmail, userName);
            return ResponseEntity.ok("Auction saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while saving auction: " + e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> findAllFilteredAuctions(@RequestParam List<String> statuses,
                                                     @RequestParam Boolean myAuctions,
                                                     @RequestParam Boolean followed,
                                                     @RequestParam List<String> dates) throws IOException {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            return ResponseEntity.ok(auctionService.getFilteredAuctions(statuses, myAuctions, followed, dates, userEmail));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while retrieving filtered auctions: " + e.getMessage());
        }
    }
}