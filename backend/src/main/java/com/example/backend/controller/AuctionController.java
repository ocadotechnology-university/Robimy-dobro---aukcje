package com.example.backend.controller;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping
    public ResponseEntity<?> saveAuction(@RequestBody AuctionCreateDto auctionCreateDto) {
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
    public ResponseEntity<?> findAllFilteredAuctions(@RequestParam(required = false) List<String> statuses,
                                                     @RequestParam Boolean myAuctions,
                                                     @RequestParam Boolean followed,
                                                     @RequestParam(required = false) List<String> dates) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

            statuses = Objects.requireNonNullElse(statuses, List.of());
            dates = Objects.requireNonNullElse(dates, List.of());
            return ResponseEntity.ok(auctionService.getFilteredAuctions(statuses, myAuctions, followed, dates, userEmail));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while retrieving filtered auctions: " + e.getMessage());
        }
    }
}