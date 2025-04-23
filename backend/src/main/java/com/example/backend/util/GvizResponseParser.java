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
            Auction auction = new Auction();

            auction.setId(UUID.fromString(getRaw(cells, 0)));
            auction.setModeratorEmail(getRaw(cells, 1));
            auction.setPreferredAuctionDate(parseDate(getRaw(cells, 2))); // Date(YYYY,MM,DD)
            auction.setAuctionDate(parseDate(getRaw(cells, 3)));
            auction.setSupplierName(getRaw(cells, 4));
            auction.setSupplierEmail(getRaw(cells, 5));
            auction.setTitle(getRaw(cells, 6));
            auction.setDescription(getRaw(cells, 7));
            auction.setSlackThreadLink(getRaw(cells, 8));
            auction.setImageUrl(getRaw(cells, 9));
            auction.setCity(getRaw(cells, 10));
            auction.setStartingPrice(parseDouble(getRaw(cells, 11)));
            auction.setFollowers(parseFollowers(getRaw(cells, 12)));

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
