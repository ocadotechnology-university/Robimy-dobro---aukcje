package com.example.backend.util;

import com.example.backend.model.Auction;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDate;
import java.util.*;

@Component
public class GvizResponseParser {

    public List<Auction> parse(String gvizJson) throws IOException {
        String cleanedJson = gvizJson
                .replace("google.visualization.Query.setResponse(", "")
                .replace(");", "")
                .replace("/*O_o*/", "")
                .trim();

        ObjectMapper mapper = new ObjectMapper();
        Response response = mapper.readValue(cleanedJson, Response.class);

        List<Auction> auctions = new ArrayList<>();
        for (Response.Row row : response.getTable().getRows()) {
            List<Response.Cell> cells = row.getC();
            Auction auction = Auction.builder()
                    .id(UUID.fromString(getRaw(cells, 0)))
                    .moderatorEmail(getRaw(cells, 1))
                    .preferredAuctionDate(parseDate(getRaw(cells, 2)))
                    .auctionDate(parseDate(getRaw(cells, 3)))
                    .supplierName(getRaw(cells, 4))
                    .supplierEmail(getRaw(cells, 5))
                    .title(getRaw(cells, 6))
                    .description(getRaw(cells, 7))
                    .imageUrl(getRaw(cells, 8))
                    .city(getRaw(cells, 9))
                    .startingPrice(parseDouble(getRaw(cells, 10)))
                    .followers(parseFollowers(getRaw(cells, 11)))
                    .followersCount((int) Double.parseDouble(Objects.requireNonNull(getRaw(cells, 12))))
                    .slackThreadLink(getRaw(cells, 13))
                    .currentBid(parseDouble(getRaw(cells, 14)))
                    .winner(getRaw(cells, 15))
                    .build();

            auctions.add(auction);
        }

        return auctions;
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

    private double parseDouble(String raw) {
        try {
            return raw != null ? Double.parseDouble(raw) : 0.0;
        } catch (Exception e) {
            return 0.0;
        }
    }

    private List<String> parseFollowers(String raw) {
        if (raw == null || raw.isBlank()) return new ArrayList<>();
        return Arrays.stream(raw.split(",")).map(String::trim).toList();
    }
}
