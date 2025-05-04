package com.example.backend.util;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;
import java.util.UUID;

@Getter
@Setter
public class AuctionQuery {
    private String queryWithFilters = "SELECT A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P, Q WHERE 1=1";
    private List<String> statuses;
    private Boolean myAuctions;
    private Boolean followed;
    private List<String> dates;
    private String userEmail;
    private UUID auctionId;

    private Map<String, String> filters = Map.of(
            "myAuctions", "F",
            "dates", "D",
            "start", "A",
            "stop", "M",
            "followed", "L",
            "ID", "A"
    );

    public AuctionQuery(List<String> statuses, Boolean myAuctions, Boolean followed, List<String> dates, String userEmail) {
        this.statuses = statuses;
        this.myAuctions = myAuctions;
        this.followed = followed;
        this.dates = dates;
        this.userEmail = userEmail;
    }

    public AuctionQuery(UUID auctionId) {
        this.auctionId = auctionId;
    }

    private void injectFilters() {
        queryWithFilters += getStatuses() + getMyAuctionsQuery() + getFollowedQuery() + getDateQuery();
    }

    private String getStatuses() {
        String statusesQuery = "";

        if(statuses.contains("NO_DATES"))
            statusesQuery += " AND " + filters.get("dates") + " IS NULL";

        if(statuses.contains("INCOMPLETE")) {
            statusesQuery += " AND (";
            for(char ci = filters.get("start").charAt(0); ci < filters.get("stop").charAt(0); ci++) {
                statusesQuery += ci + " IS NULL OR ";
            }
            statusesQuery += filters.get("stop").charAt(0) + " IS NULL)";
        }

        if(statuses.contains("APPROVED"))
            statusesQuery += " AND " + filters.get("dates") + " IS NOT NULL";

        return statusesQuery;
    }

    private String getMyAuctionsQuery() {
        String myAuctionsQuery = "";

        if(myAuctions)
            myAuctionsQuery += " AND " + filters.get("myAuctions") + "=" + "'" + userEmail + "'";

        return myAuctionsQuery;
    }

    private String getFollowedQuery() {
        String followedQuery = "";

        if(followed)
            followedQuery += " AND " + filters.get("followed") + " CONTAINS " + "'" + userEmail + "'";

        return followedQuery;
    }

    private String getDateQuery() {
        StringBuilder dateQuery = new StringBuilder();

        if (dates != null && !dates.isEmpty()) {
            for (String date : dates) {
                dateQuery.append(" OR ")
                        .append(filters.get("dates"))
                        .append(" = date '")
                        .append(date)
                        .append("'");
            }
        }

        return dateQuery.toString();
    }

    public String getQueryWithFilters() {
        injectFilters();

        return queryWithFilters;
    }

    public String getQueryWithAuctionId() {
        queryWithFilters += " AND " + filters.get("ID") + "=" + "'" + auctionId + "'";

        return queryWithFilters;
    }
}
