package com.example.backend.repository;

import com.example.backend.gviz.AuctionQueryBuilder;
import com.example.backend.model.Auction;
import com.example.backend.service.GoogleSheetsHeaderMappingService;
import com.example.backend.service.GoogleSheetsService;
import com.example.backend.util.AuctionSorter;
import com.example.backend.util.CreateRowInGoogleSheets;
import com.example.backend.gviz.GvizResponseParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public class GoogleSheetsAuctionRepository implements AuctionRepository {
    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;
    private final CreateRowInGoogleSheets createRowInGoogleSheets;
    private final GoogleSheetsHeaderMappingService headerMappingService;

    public GoogleSheetsAuctionRepository(
            GoogleSheetsService googleSheetsService,
            GvizResponseParser gvizResponseParser,
            CreateRowInGoogleSheets createRowInGoogleSheets,
            GoogleSheetsHeaderMappingService headerMappingService
    ) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
        this.createRowInGoogleSheets = createRowInGoogleSheets;
        this.headerMappingService = headerMappingService;
    }

    @Override
    public void save(Auction auction) throws IOException {
        List<Object> row = createRowInGoogleSheets.createRowFromAuction(auction, headerMappingService.getHeaderIndexMap("Auction"));

        googleSheetsService.appendRow("Auction", List.of(row));
    }

    @Override
    public void update(UUID auctionId, Auction auction) throws IOException {
        List<Object> updatedRow = createRowInGoogleSheets.createRowFromAuction(auction, headerMappingService.getHeaderIndexMap("Auction"));

        try {
            List<List<Object>> rows = googleSheetsService.readAll("Auction");
            for (int i = 0; i < rows.size(); i++) {
                List<Object> searchRow = rows.get(i);
                if (!searchRow.isEmpty() && auctionId.toString().equals(searchRow.get(0).toString())) {
                    googleSheetsService.updateRow("Auction", i, updatedRow);
                    return;
                }
            }
            throw new RuntimeException("Auction not found: " + auctionId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to update auction", e);
        }
    }

    @Override
    public Auction findByAuctionId(UUID auctionId) throws IOException {
        String query = new AuctionQueryBuilder(headerMappingService)
                .selectAllColumns()
                .withId(auctionId)
                .build();
        String response = googleSheetsService.queryWithGviz(query, "Auction");
        return gvizResponseParser.parseAuctionsResponse(response).get(0);
    }

    @Override
    public List<Auction> findAllByFiltersAndUser(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String sortBy, String userEmail) throws IOException {
        String queryWithFilters = new AuctionQueryBuilder(headerMappingService)
                .selectAllColumns()
                .withStatuses(statuses)
                .withDates(dates)
                .withSupplier(myAuctions ? userEmail : null)
                .withFollowed(followed ? userEmail : null)
                .build();

        String response = googleSheetsService.queryWithGviz(queryWithFilters, "Auction");
        List<Auction> auctions = gvizResponseParser.parseAuctionsResponse(response);
        return AuctionSorter.sortAuctions(auctions, sortBy);
    }

    private List<String> findFollowersByAuctionId(UUID auctionId) throws IOException {
        String query = new AuctionQueryBuilder(headerMappingService)
                .onlyFollowersById(auctionId)
                .build();
        String response = googleSheetsService.queryWithGviz(query, "Auction");
        return gvizResponseParser.parseFollowersResponse(response);
    }

    private void updateFollowersInAuction(UUID auctionId, List<String> followers) {
        try {
            List<List<Object>> rows = googleSheetsService.readAll("Auction");
            for (int i = 0; i < rows.size(); i++) {
                List<Object> row = rows.get(i);
                if (!row.isEmpty() && auctionId.toString().equals(row.get(0).toString())) {
                    String json = new ObjectMapper().writeValueAsString(followers);
                    int followersIndex = headerMappingService.getColumnIndex("Auction", "followers");
                    int followersCountIndex = headerMappingService.getColumnIndex("Auction", "followersCount");


                    googleSheetsService.updateCellValue("Auction", i, followersIndex, json);
                    // This should probably be replaced with a single batched request to reduce latency and API usage
                    googleSheetsService.updateCellValue("Auction", i, followersCountIndex, createRowInGoogleSheets.makeNotNull(followers.size()));

                    return;
                }
            }
            throw new RuntimeException("Auction not found: " + auctionId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to update followers", e);
        }
    }

    @Override
    public void follow(UUID auctionId, String userEmail) throws IOException {
        List<String> followers = findFollowersByAuctionId(auctionId);
        if (!followers.contains(userEmail)) {
            followers.add(userEmail);
            updateFollowersInAuction(auctionId, followers);
        }
    }

    @Override
    public void unfollow(UUID auctionId, String userEmail) throws IOException {
        List<String> followers = findFollowersByAuctionId(auctionId);
        if (followers.contains(userEmail)) {
            followers.remove(userEmail);
            updateFollowersInAuction(auctionId, followers);
        }
    }

    @Override
    public void delete(UUID auctionId) throws IOException {
        List<List<Object>> rows = googleSheetsService.readAll("Auction");
        try {
            for (int i = 0; i < rows.size(); i++) {
                List<Object> row = rows.get(i);
                if (!row.isEmpty() && auctionId.toString().equals(row.get(0).toString())) {
                    googleSheetsService.deleteRow("Auction", i);
                    return;
                }
            }
            throw new RuntimeException("Auction not found: " + auctionId);
        } catch (IOException e) {
            throw new RuntimeException("Failed to delete auction", e);
        }
    }
}