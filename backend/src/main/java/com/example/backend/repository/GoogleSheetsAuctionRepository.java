package com.example.backend.repository;

import com.example.backend.model.Auction;
import com.example.backend.util.AuctionQuery;
import com.example.backend.service.GoogleSheetsService;
import com.example.backend.util.FollowersQuery;
import com.example.backend.util.GvizResponseParser;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.UUID;

@Repository
public class GoogleSheetsAuctionRepository implements AuctionRepository {
    private final GoogleSheetsService googleSheetsService;
    private final GvizResponseParser gvizResponseParser;

    public GoogleSheetsAuctionRepository(GoogleSheetsService googleSheetsService, GvizResponseParser gvizResponseParser) {
        this.googleSheetsService = googleSheetsService;
        this.gvizResponseParser = gvizResponseParser;
    }

    private String makeNotNull(Object value) {
        return value != null ? value.toString() : "";
    }

    @Override
    public void save(Auction auction) throws IOException {
        List<Object> row = Arrays.asList(
                makeNotNull(auction.getId()),
                makeNotNull(auction.getModeratorEmail()),
                makeNotNull(auction.getPreferredAuctionDate()),
                makeNotNull(auction.getAuctionDate()),
                makeNotNull(auction.getSupplierName()),
                makeNotNull(auction.getSupplierEmail()),
                makeNotNull(auction.getTitle()),
                makeNotNull(auction.getDescription()),
                makeNotNull(auction.getImageUrl()),
                makeNotNull(auction.getCity()),
                auction.getStartingPrice(),
                auction.getCurrentBid(),
                makeNotNull(auction.getWinner()),
                makeNotNull(auction.getSlackThreadLink())
        );

        googleSheetsService.appendRow("Auction", List.of(row));
    }

    @Override
    public List<Auction> findAllByFiltersAndUser(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String userEmail) throws IOException {
        AuctionQuery auctionQuery = new AuctionQuery(statuses, myAuctions, followed, dates, userEmail);
        String queryWithFilters = auctionQuery.getQueryWithFilters();
        System.out.println(queryWithFilters);
        String response = googleSheetsService.queryWithGviz(queryWithFilters);
        return gvizResponseParser.parseAuctionsResponse(response);
    }

    private List<String> findFollowersByAuctionId(UUID auctionId) throws IOException {
        FollowersQuery followersQuery = new FollowersQuery(auctionId);
        String query = followersQuery.getQuery();
        String response = googleSheetsService.queryWithGviz(query);
        return gvizResponseParser.parseFollowersResponse(response);
    }

    private void updateFollowersInAuction(UUID auctionId, List<String> followers) {
        try {
            List<List<Object>> rows = googleSheetsService.readSheet("Auction");
            for (int i = 0; i < rows.size(); i++) {
                List<Object> row = rows.get(i);
                if (!row.isEmpty() && auctionId.toString().equals(row.get(0).toString())) {
                    String json = new ObjectMapper().writeValueAsString(followers);
                    // TODO: Replace hardcoded column index 11 with dynamic detection of the "followers" column
                    googleSheetsService.updateCellValue("Auction", i, 11, json);
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
}