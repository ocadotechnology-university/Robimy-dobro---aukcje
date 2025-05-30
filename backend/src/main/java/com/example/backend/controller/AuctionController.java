package com.example.backend.controller;

import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.service.AuctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@RestController
@RequestMapping("/auctions")
public class AuctionController {
    private AuctionService auctionService;
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    @PostMapping
    public ResponseEntity<?> saveAuction(@RequestBody AuctionCreateDto auctionCreateDto) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            String userName = SecurityContextHolder.getContext().getAuthentication().getName().split("@")[0];
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

    @PostMapping("/{auctionId}/follow")
    public ResponseEntity<?> followAuction(@PathVariable UUID auctionId) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            auctionService.followAuction(auctionId, userEmail);
            return ResponseEntity.ok("Auction followed successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while following the auction: " + e.getMessage());
        }
    }

    @DeleteMapping("/{auctionId}/follow")
    public ResponseEntity<?> unfollowAuction(@PathVariable UUID auctionId) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            auctionService.unfollowAuction(auctionId, userEmail);
            return ResponseEntity.ok("Auction unfollowed successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while unfollowing the auction: " + e.getMessage());
        }
    }

    @PatchMapping("/{auctionId}/update")
    public ResponseEntity<?> updateAuction(@RequestBody AuctionUpdateDto auctionUpdateDto, @PathVariable UUID auctionId) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
            auctionService.update(auctionId, auctionUpdateDto, userEmail);
            return ResponseEntity.ok("Auction update successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while updating the auction: " + e.getMessage());
        }
    }

    @PatchMapping("/{auctionId}/updatePublicId")
    public ResponseEntity<?> updateAuctionPublicId(@RequestBody String publicId, @PathVariable UUID auctionId) {
        try {
            auctionService.updatePublicId(auctionId, publicId);
            return ResponseEntity.ok("Auction publicId update successfully");
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while updating auction's publicId: " + e.getMessage());
        }
    }

}