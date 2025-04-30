package com.example.backend.util;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class FollowersQuery {
    private String query = "SELECT L WHERE 1=1";
    private UUID auctionId;

    private static final Map<String, String> columns = Map.of(
            "auctionId", "A",
            "followers", "L"
    );

    public FollowersQuery(UUID auctionId) {
        this.auctionId = auctionId;
    }

    private void injectFilters() {
        query += getAuctionIdFilter();
    }

    private String getAuctionIdFilter() {
        if (auctionId != null) {
            return columns.get("auctionId") + " = '" + auctionId + "'";
        }
        return "";
    }

    public String getQuery() {
        injectFilters();
        return query;
    }
}