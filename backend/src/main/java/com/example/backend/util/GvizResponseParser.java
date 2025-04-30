package com.example.backend.util;

import com.example.backend.model.Auction;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Component
public class GvizResponseParser {

    public List<Auction> parseAuctionsResponse(String gvizJson) throws IOException {
        String cleanedJson = cleanGvizJson(gvizJson);
        Response response = new ObjectMapper().readValue(cleanedJson, Response.class);
        Map<String, Integer> headerIndices = mapHeaders(response.getTable().getCols());

        List<Auction> auctions = new ArrayList<>();
        for (Response.Row row : response.getTable().getRows()) {
            auctions.add(parseAuctionFromRow(row, headerIndices));
        }
        return auctions;
    }

    public List<String> parseFollowersResponse(String gvizJson) throws IOException {
        String cleanedJson = cleanGvizJson(gvizJson);
        Response response = new ObjectMapper().readValue(cleanedJson, Response.class);

        if (response.getTable().getRows().isEmpty()) {
            return List.of();
        }

        Response.Row row = response.getTable().getRows().get(0);
        List<Response.Cell> cells = row.getC();
        if (cells.isEmpty() || cells.get(0) == null || cells.get(0).getV() == null) {
            return List.of();
        }

        String followersJson = cells.get(0).getV().toString();
        if (followersJson.isBlank()) {
            return List.of();
        }

        return new ObjectMapper().readValue(followersJson, new TypeReference<>() {
        });
    }

    private String cleanGvizJson(String gvizJson) {
        return gvizJson
                .replace("google.visualization.Query.setResponse(", "")
                .replace(");", "")
                .replace("/*O_o*/", "")
                .trim();
    }

    private Map<String, Integer> mapHeaders(List<Response.Column> columns) {
        Map<String, Integer> headerIndices = new HashMap<>();
        for (int i = 0; i < columns.size(); i++) {
            headerIndices.put(columns.get(i).getLabel().trim(), i);
        }
        return headerIndices;
    }

    private Auction parseAuctionFromRow(Response.Row row, Map<String, Integer> headerIndexMap) {
        List<Response.Cell> cells = row.getC();

        return Auction.builder()
                .id(UUID.fromString(getRaw(cells, headerIndexMap.get(Column.ID.label))))
                .moderatorEmail(getRaw(cells, headerIndexMap.get(Column.MODERATOR_EMAIL.label)))
                .preferredAuctionDate(parseDate(getRaw(cells, headerIndexMap.get(Column.PREFERRED_DATE.label))))
                .auctionDate(parseDate(getRaw(cells, headerIndexMap.get(Column.AUCTION_DATE.label))))
                .supplierName(getRaw(cells, headerIndexMap.get(Column.SUPPLIER_NAME.label)))
                .supplierEmail(getRaw(cells, headerIndexMap.get(Column.SUPPLIER_EMAIL.label)))
                .title(getRaw(cells, headerIndexMap.get(Column.TITLE.label)))
                .description(getRaw(cells, headerIndexMap.get(Column.DESCRIPTION.label)))
                .imageUrl(getRaw(cells, headerIndexMap.get(Column.IMAGE_URL.label)))
                .city(getRaw(cells, headerIndexMap.get(Column.CITY.label)))
                .startingPrice(parseDouble(getRaw(cells, headerIndexMap.get(Column.STARTING_PRICE.label))))
                .followers(parseFollowers(getRaw(cells, headerIndexMap.get(Column.FOLLOWERS.label))))
                .followersCount(
                        parseDouble(getRaw(cells, headerIndexMap.get(Column.FOLLOWERS_COUNT.label))) != null
                                ? parseDouble(getRaw(cells, headerIndexMap.get(Column.FOLLOWERS_COUNT.label))).intValue()
                                : null
                )
                .slackThreadLink(getRaw(cells, headerIndexMap.get(Column.SLACK_THREAD.label)))
                .currentBid(parseDouble(getRaw(cells, headerIndexMap.get(Column.CURRENT_BID.label))))
                .winner(getRaw(cells, headerIndexMap.get(Column.WINNER.label)))
                .build();
    }

    private String getRaw(List<Response.Cell> cells, int index) {
        if (index >= cells.size()) return null;
        Response.Cell cell = cells.get(index);
        if (cell == null || cell.getV() == null || cell.getV().toString() == null) return null;
        return cell.getV().toString();
    }

    private LocalDate parseDate(String raw) {
        try {
            if (raw == null) return null;
            if (raw.startsWith("Date(")) {
                String[] parts = raw.replace("Date(", "").replace(")", "").split(",");
                int year = Integer.parseInt(parts[0]);
                int month = Integer.parseInt(parts[1]) + 1;
                int day = Integer.parseInt(parts[2]);
                return LocalDate.of(year, month, day);
            } else {
                return LocalDate.parse(raw);
            }
        } catch (Exception e) {
            return null;
        }
    }

    private Double parseDouble(String raw) {
        try {
            return (raw != null && !raw.isBlank()) ? Double.parseDouble(raw) : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

    private List<String> parseFollowers(String raw) {
        if (raw == null || raw.isBlank()) return new ArrayList<>();
        try {
            return new ObjectMapper().readValue(raw, new TypeReference<>() {
            });
        } catch (IOException e) {
            return new ArrayList<>();
        }
    }
}