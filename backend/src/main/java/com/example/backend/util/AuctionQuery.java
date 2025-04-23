package com.example.backend.util;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Map;

@Getter
@Setter
public class AuctionQuery {
    private String queryWithFilters = "SELECT A, B, C, D, E, F, G, H, I, J, K, L, M WHERE 1=1";
    private ArrayList<String> statuses;
    private Boolean myAuctions;
    private Boolean followed;
    private ArrayList<String> dates;
    private String userEmail;

    private Map<String, String> filters = Map.of(
            "myAuctions", "F",
            "dates", "D",
            "start", "A",
            "stop", "M",
            "followed", "L"
    );

    public AuctionQuery(ArrayList<String> statuses, Boolean myAuctions, Boolean followed, ArrayList<String> dates, String userEmail) {
        this.statuses = statuses;
        this.myAuctions = myAuctions;
        this.followed = followed;
        this.dates = dates;
        this.userEmail = userEmail;
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

        if(statuses.contains("APPROVED")) {
            for(char ca = filters.get("start").charAt(0); ca <= filters.get("stop").charAt(0); ca++) {
                statusesQuery += " AND " + ca + " IS NOT NULL";
            }
        }

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
        String dateQuery = "";

        if(dates.size() != 0) {
            for(String date: dates) {
                dateQuery += " AND " + filters.get("dates") + "=" + date;
            }
        }

        return dateQuery;
    }

    public String getQueryWithFilters() {
        injectFilters();

        return queryWithFilters;
    }
}
