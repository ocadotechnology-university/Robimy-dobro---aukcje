package com.example.backend.service;

import com.example.backend.dto.AuctionCreateDto;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import com.example.backend.mapper.AuctionMapper;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;

import java.io.IOException;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AuctionServiceTest {

    private AuctionRepository auctionRepository;
    private AuctionMapper auctionMapper;
    private AuctionService auctionService;

    @BeforeEach
    void setUp() {
        auctionRepository = mock(AuctionRepository.class);
        auctionMapper = mock(AuctionMapper.class);
        auctionService = new AuctionService(auctionRepository, auctionMapper);
    }

    @Test
    void save() throws IOException {
        AuctionCreateDto auctionCreateDto = new AuctionCreateDto();

        auctionCreateDto.setCity("Wrocław");
        auctionCreateDto.setDescription("Opis");
        auctionCreateDto.setTitle("AukcjaTest");
        auctionCreateDto.setWantsToBeModerator(true);
        String userName = "testName";
        String userEmail = "testEmail@test.com";

        Auction auction = Auction.builder()
                .city("Wrocław")
                .title("AukcjaTest")
                .supplierEmail(userEmail)
                .moderatorEmail(userEmail)
                .build();

        when(auctionMapper.mapFromCreateDtoToAuction(auctionCreateDto, userEmail, userName)).thenReturn(auction);
        assertEquals("Wrocław", auction.getCity());
        assertEquals("AukcjaTest", auction.getTitle());
        assertEquals("testEmail@test.com", auction.getSupplierEmail());
        assertEquals("testEmail@test.com", auction.getModeratorEmail());

        auctionService.save(auctionCreateDto, userEmail, userName);
        verify(auctionRepository, times(1)).save(auction);
    }

    @Test
    void update() throws IOException {
    }

    @Test
    void getAuctionById() throws IOException {
    }

    @Test
    void getFilteredAuctions() throws IOException {
    }

    @Test
    void followAuction() throws IOException {
    }

    @Test
    void unfollowAuction() throws IOException {
    }
}