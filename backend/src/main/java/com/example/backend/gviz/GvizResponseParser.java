package com.example.backend.gviz;

import com.example.backend.model.Auction;
import com.example.backend.util.Column;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
                .publicId(parseLong(getRaw(cells, headerIndexMap.get(Column.PUBLIC_ID.label))))
                .moderatorEmail(getRaw(cells, headerIndexMap.get(Column.MODERATOR_EMAIL.label)))
                .auctionDate(parseDate(getRaw(cells, headerIndexMap.get(Column.PREFERRED_DATE.label))))
                .auctionDate(parseDate(getRaw(cells, headerIndexMap.get(Column.AUCTION_DATE.label))))
                .supplierName(getRaw(cells, headerIndexMap.get(Column.SUPPLIER_NAME.label)))
                .supplierEmail(getRaw(cells, headerIndexMap.get(Column.SUPPLIER_EMAIL.label)))
                .title(getRaw(cells, headerIndexMap.get(Column.TITLE.label)))
                .description(getRaw(cells, headerIndexMap.get(Column.DESCRIPTION.label)))
                .fileId(getRaw(cells, headerIndexMap.get(Column.IMAGE_URL.label)))
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
                .auctionStartDateTime(parseDateTime(getRaw(cells, headerIndexMap.get(Column.START_DATETIME.label))))
                .auctionEndDateTime(parseDateTime(getRaw(cells, headerIndexMap.get(Column.END_DATETIME.label))))
                .build();
    }

    public List<String> parseSingleColumn(String gvizJson) throws IOException {
        String cleanedJson = cleanGvizJson(gvizJson);
        Response response = new ObjectMapper().readValue(cleanedJson, Response.class);

        return response.getTable().getRows().stream()
                .skip(1)
                .map(row -> row.getC().get(0))
                .filter(cell -> cell != null && cell.getV() != null)
                .map(cell -> cell.getV().toString())
                .toList();
    }

    public List<LocalDate> parseSingleDateColumn(String gvizJson) throws IOException {
        String cleanedJson = cleanGvizJson(gvizJson);
        Response response = new ObjectMapper().readValue(cleanedJson, Response.class);

        return Optional.ofNullable(response.getTable().getRows())
                .orElse(List.of())
                .stream()
                .map(row -> row.getC().get(0))
                .filter(cell -> cell != null && cell.getV() != null)
                .map(cell -> parseDate(cell.getV().toString()))
                .filter(Objects::nonNull)
                .toList();
    }

    private String getRaw(List<Response.Cell> cells, int index) {
        if (index >= cells.size()) return null;
        Response.Cell cell = cells.get(index);
        if (cell == null || cell.getV() == null || cell.getV().toString() == null) return null;
        return cell.getV().toString();
    }

    private LocalDateTime parseDateTime(String raw) {
        try {
            if (raw == null || !raw.startsWith("Date(")) return null;

            String[] parts = raw.replace("Date(", "").replace(")", "").split(",");
            int year = Integer.parseInt(parts[0].trim());
            int month = Integer.parseInt(parts[1].trim()) + 1;
            int day = Integer.parseInt(parts[2].trim());
            int hour = Integer.parseInt(parts[3].trim());
            int minute = Integer.parseInt(parts[4].trim());
            int second = Integer.parseInt(parts[5].trim());

            return LocalDateTime.of(year, month, day, hour, minute, second);
        } catch (Exception e) {
            return null;
        }
    }

    private Long parseLong(String raw) {
        try {
            if (raw == null || raw.isBlank()) return null;
            return (long) Double.parseDouble(raw);
        } catch (NumberFormatException e) {
            return null;
        }
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

    public boolean hasAnyRows(String gvizJson) throws IOException {
        String cleanedJson = cleanGvizJson(gvizJson);
        Response response = new ObjectMapper().readValue(cleanedJson, Response.class);
        return response.getTable().getRows() != null && !response.getTable().getRows().isEmpty();
    }
}