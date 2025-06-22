package com.example.backend.service;

import com.example.backend.exception.AdminPermissionRequiredException;
import com.example.backend.exception.AuctionAlreadyStartedException;
import com.example.backend.exception.ErrorMessages;
import com.example.backend.exception.NotAuctionOwnerException;
import com.example.backend.dto.AuctionCreateDto;
import com.example.backend.dto.AuctionGetDto;
import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.dto.PublicIdDto;
import com.example.backend.mapper.AuctionMapper;
import com.example.backend.model.Auction;
import com.example.backend.model.AuctionStatus;
import com.example.backend.repository.AuctionRepository;
import com.example.backend.util.AuctionStatusResolver;
import org.springframework.stereotype.Service;
import org.springframework.security.core.context.SecurityContextHolder;

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
        Auction auction = auctionMapper.mapFromUpdateDtoToAuction(getAuctionById(auctionId), auctionUpdateDto, userEmail);
        validateEditPermission(auction, userEmail);
        auctionRepository.update(auctionId, auction);
    }

    private void validateEditPermission(Auction auction, String userEmail) {
        if (isAdmin()) return;
        if (!auction.getSupplierEmail().equals(userEmail))
            throw new NotAuctionOwnerException(ErrorMessages.NO_PERMISSION_EDIT_AUCTION);
        if (AuctionStatusResolver.resolveStatus(auction) != AuctionStatus.NOT_STARTED)
            throw new AuctionAlreadyStartedException(ErrorMessages.NO_PERMISSION_EDIT_AUCTION );
    }

    private boolean isAdmin() {
        return SecurityContextHolder.getContext().getAuthentication().getAuthorities().stream()
                .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_ADMIN"));
    }

    public void updatePublicId(UUID auctionId, PublicIdDto publicIdDto) throws IOException {
        if(!isAdmin()) throw new AdminPermissionRequiredException(ErrorMessages.NO_PERMISSION_EDIT_ID);

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

    public void deleteAuction(UUID auctionId, String userEmail) throws IOException {
        Auction auction = getAuctionById(auctionId);
        validateDeletePermission(auction, userEmail);
        auctionRepository.delete(auctionId);
    }

    private void validateDeletePermission(Auction auction, String userEmail) {
        if (isAdmin()) return;
        if (!auction.getSupplierEmail().equals(userEmail))
            throw new NotAuctionOwnerException(ErrorMessages.NO_PERMISSION_DELETE_AUCTION);
        if (AuctionStatusResolver.resolveStatus(auction) != AuctionStatus.NOT_STARTED)
            throw new AuctionAlreadyStartedException(ErrorMessages.NO_PERMISSION_DELETE_AUCTION);
    }
}