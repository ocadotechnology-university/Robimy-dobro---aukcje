package com.example.backend.util;

import com.example.backend.model.Auction;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
public class CreateRowInGoogleSheets {
    public String makeNotNull(Object value) {
        return value != null ? value.toString() : "";
    }

    private Object makeNotNullForNumbers(Object value) {
        return value != null ? value : "";
    }

    private boolean isNumericField(String header) {
        return List.of(
                Column.STARTING_PRICE.label,
                Column.CURRENT_BID.label,
                Column.FOLLOWERS_COUNT.label
        ).contains(header);
    }

    public List<Object> createRowFromAuction(Auction auction, Map<String, Integer> headerIndexMap) {
        Object[] row = new Object[headerIndexMap.size()];

        Map<String, Function<Auction, Object>> extractors = Map.ofEntries(
                Map.entry(Column.ID.label, Auction::getId),
                Map.entry(Column.PUBLIC_ID.label, Auction::getPublicId),
                Map.entry(Column.MODERATOR_EMAIL.label, Auction::getModeratorEmail),
                Map.entry(Column.AUCTION_DATE.label, Auction::getAuctionDate),
                Map.entry(Column.SUPPLIER_NAME.label, Auction::getSupplierName),
                Map.entry(Column.SUPPLIER_EMAIL.label, Auction::getSupplierEmail),
                Map.entry(Column.TITLE.label, Auction::getTitle),
                Map.entry(Column.DESCRIPTION.label, Auction::getDescription),
                Map.entry(Column.IMAGE_URL.label, Auction::getFileId),
                Map.entry(Column.CITY.label, Auction::getCity),
                Map.entry(Column.STARTING_PRICE.label, Auction::getStartingPrice),
                Map.entry(Column.CURRENT_BID.label, Auction::getCurrentBid),
                Map.entry(Column.FOLLOWERS.label, Auction::getFollowers),
                Map.entry(Column.FOLLOWERS_COUNT.label, Auction::getFollowersCount),
                Map.entry(Column.SLACK_THREAD.label, Auction::getSlackThreadLink),
                Map.entry(Column.WINNER.label, Auction::getWinner),
                Map.entry(Column.START_DATETIME.label, Auction::getAuctionStartDateTime),
                Map.entry(Column.END_DATETIME.label, Auction::getAuctionEndDateTime)
        );

        for (Map.Entry<String, Integer> entry : headerIndexMap.entrySet()) {
            String header = entry.getKey();
            int index = entry.getValue();

            Object value = extractors.getOrDefault(header, a -> "").apply(auction);
            row[index] = isNumericField(header) ? makeNotNullForNumbers(value) : makeNotNull(value);
        }

        return Arrays.asList(row);
    }
}