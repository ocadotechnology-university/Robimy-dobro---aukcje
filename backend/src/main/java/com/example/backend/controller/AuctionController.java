package com.example.backend.controller;

import com.example.backend.constants.CustomException;
import com.example.backend.constants.ErrorMessages;
import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.dto.PublicIdDto;
import com.example.backend.service.AuctionService;
import com.example.backend.service.GoogleAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.UUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/auctions")
public class AuctionController {
    private AuctionService auctionService;
    public AuctionController(AuctionService auctionService) {
        this.auctionService = auctionService;
    }

    private static final Logger logger = LoggerFactory.getLogger(AuctionController.class);

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
    public ResponseEntity<?> findAllFilteredAuctions(
            @RequestParam(required = false) List<String> statuses,
            @RequestParam Boolean myAuctions,
            @RequestParam Boolean followed,
            @RequestParam(required = false) List<String> dates,
            @RequestParam(required = false) String sortBy
    ) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

            statuses = Objects.requireNonNullElse(statuses, List.of());
            dates = Objects.requireNonNullElse(dates, List.of());
            return ResponseEntity.ok(auctionService.getFilteredAuctions(statuses, myAuctions, followed, dates, sortBy, userEmail));
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
    public ResponseEntity<?> updateAuctionPublicId(@RequestBody PublicIdDto publicIdDto, @PathVariable UUID auctionId) {
        try {
            String userEmail = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();

            Collection<? extends GrantedAuthority> authorities = SecurityContextHolder.getContext().getAuthentication().getAuthorities();
            boolean isAdmin = authorities.stream().anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));

            if(!isAdmin) {
                throw new CustomException(ErrorMessages.NO_PERMISSION);
            }

            auctionService.updatePublicId(auctionId, publicIdDto);
            return ResponseEntity.ok("Auction publicId update successfully");
        } catch (CustomException e) {
            logger.error("Error while updating auction's publicId: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error while updating auction's publicId: " + e.getMessage());
        }
    }

}