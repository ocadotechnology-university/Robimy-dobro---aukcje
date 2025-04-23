package com.example.backend.controller;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;

@RestController
@RequestMapping("/auctions")
public class AuctionController {

    @Autowired
    private AuctionService auctionService;

    @PostMapping("/save")
    public ResponseEntity<?> saveAuction(@RequestBody AuctionCreateDto auctionCreateDto) throws IOException {
        try {
            auctionService.save(auctionCreateDto);
            return ResponseEntity.ok("Auction saved successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while saving auction: " + e.getMessage());
        }
    }

    @GetMapping("/get")
    public ResponseEntity<?> findAllFilteredAuctions(@RequestParam ArrayList<String> statuses, @RequestParam boolean myAuctions, @RequestParam boolean followed, @RequestParam ArrayList<String> dates) throws IOException {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            return ResponseEntity.ok(auctionService.getFilteredAuctions(statuses, myAuctions, followed, dates, userEmail));
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while retrieving filtered auctions: " + e.getMessage());
        }
    }
}