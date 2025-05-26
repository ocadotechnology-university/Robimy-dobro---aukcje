package com.example.backend.gviz;

import com.example.backend.service.GoogleSheetsHeaderMappingService;
import com.example.backend.util.Column;

import java.util.List;
import java.util.UUID;

public class AuctionQueryBuilder {
    private final GvizQueryBuilder builder;

    public AuctionQueryBuilder(GoogleSheetsHeaderMappingService headerMappingService) {
        this.builder = new GvizQueryBuilder(headerMappingService.getHeaderLetterMap("Auction"));
    }

    public AuctionQueryBuilder selectAllColumns() {
        builder.select(
                Column.ID.label,
                Column.PUBLIC_ID.label,
                Column.MODERATOR_EMAIL.label,
                Column.PREFERRED_DATE.label,
                Column.AUCTION_DATE.label,
                Column.SUPPLIER_NAME.label,
                Column.SUPPLIER_EMAIL.label,
                Column.TITLE.label,
                Column.DESCRIPTION.label,
                Column.IMAGE_URL.label,
                Column.CITY.label,
                Column.STARTING_PRICE.label,
                Column.FOLLOWERS.label,
                Column.FOLLOWERS_COUNT.label,
                Column.SLACK_THREAD.label,
                Column.CURRENT_BID.label,
                Column.WINNER.label
        );
        return this;
    }

    public AuctionQueryBuilder withStatuses(List<String> statuses) {
        if (statuses.contains("NO_DATES")) {
            builder.whereIsNull(Column.AUCTION_DATE.label);
        }

        if (statuses.contains("APPROVED")) {
            builder.whereIsNotNull(Column.AUCTION_DATE.label);
        }

        if (statuses.contains("INCOMPLETE")) {
            List<String> requiredFields = List.of(
                    Column.ID.label,
                    Column.TITLE.label,
                    Column.DESCRIPTION.label,
                    Column.AUCTION_DATE.label,
                    Column.SUPPLIER_EMAIL.label,
                    Column.IMAGE_URL.label,
                    Column.SLACK_THREAD.label
            );
            builder.whereAnyIsNull(requiredFields);
        }

        return this;
    }

    public AuctionQueryBuilder withSupplier(String email) {
        if (email != null) {
            builder.whereEquals(Column.SUPPLIER_EMAIL.label, email);
        }
        return this;
    }

    public AuctionQueryBuilder withFollowed(String email) {
        if (email != null) {
            builder.whereContains(Column.FOLLOWERS.label, email);
        }
        return this;
    }

    public AuctionQueryBuilder withDates(List<String> dates) {
        builder.whereDateEqualsAnyOf(Column.AUCTION_DATE.label, dates);
        return this;
    }

    public AuctionQueryBuilder withId(UUID auctionId) {
        builder.whereEquals(Column.ID.label, auctionId.toString());
        return this;
    }

    public AuctionQueryBuilder onlyFollowersById(UUID auctionId) {
        builder.select(Column.FOLLOWERS.label);
        builder.whereEquals(Column.ID.label, auctionId.toString());
        return this;
    }

    public String build() {
        return builder.build();
    }
}