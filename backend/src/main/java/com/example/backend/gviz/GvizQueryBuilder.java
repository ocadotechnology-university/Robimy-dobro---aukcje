package com.example.backend.gviz;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

public class GvizQueryBuilder {
    private final Map<String, String> columnLetterMap;
    private final List<String> conditions = new ArrayList<>();
    private final List<String> selectedColumns = new ArrayList<>();
    private final List<String> orderings = new ArrayList<>();

    public GvizQueryBuilder(Map<String, String> columnLetterMap) {
        this.columnLetterMap = columnLetterMap;
    }

    public GvizQueryBuilder select(String... columnNames) {
        for (String columnName : columnNames) {
            selectedColumns.add(columnLetterMap.get(columnName));
        }
        return this;
    }

    public GvizQueryBuilder whereEquals(String columnName, String value) {
        conditions.add(columnLetterMap.get(columnName) + " = '" + value + "'");
        return this;
    }

    public GvizQueryBuilder whereContains(String columnName, String value) {
        conditions.add(columnLetterMap.get(columnName) + " CONTAINS '" + value + "'");
        return this;
    }

    public GvizQueryBuilder whereIsNull(String columnName) {
        conditions.add(columnLetterMap.get(columnName) + " IS NULL");
        return this;
    }

    public GvizQueryBuilder whereIsNotNull(String columnName) {
        conditions.add(columnLetterMap.get(columnName) + " IS NOT NULL");
        return this;
    }

    public GvizQueryBuilder whereAnyIsNull(List<String> columnNames) {
        if (columnNames == null || columnNames.isEmpty()) return this;

        String orCondition = columnNames.stream()
                .map(columnLetterMap::get)
                .map(column -> column + " IS NULL")
                .reduce((a, b) -> a + " OR " + b)
                .map(condition -> "(" + condition + ")")
                .orElse("");

        conditions.add(orCondition);
        return this;
    }

    public GvizQueryBuilder whereAllNotNull(List<String> columnNames) {
        if (columnNames == null || columnNames.isEmpty()) return this;

        String andCondition = columnNames.stream()
                .map(columnLetterMap::get)
                .map(column -> column + " IS NOT NULL")
                .reduce((a, b) -> a + " AND " + b)
                .map(condition -> "(" + condition + ")")
                .orElse("");

        conditions.add(andCondition);
        return this;
    }

    public GvizQueryBuilder whereDateEqualsAnyOf(String columnName, List<String> dates) {
        if (dates == null || dates.isEmpty()) return this;

        String columnLetter = columnLetterMap.get(columnName);
        String orClause = dates.stream()
                .map(date -> columnLetter + " = date '" + date + "'")
                .reduce((a, b) -> a + " OR " + b)
                .map(clause -> "(" + clause + ")")
                .orElse("");

        conditions.add(orClause);
        return this;
    }

    public GvizQueryBuilder whereDateBeforeNow(String columnName) {
        String columnLetter = columnLetterMap.get(columnName);
        conditions.add(columnLetter + " < now()");
        return this;
    }

    public GvizQueryBuilder orderBy(String columnName, boolean ascending) {
        String columnLetter = columnLetterMap.get(columnName);
        String order = columnLetter + (ascending ? " ASC" : " DESC");
        orderings.add(order);
        return this;
    }

    public String build() {
        String selectClause = "SELECT " + String.join(", ", selectedColumns);
        String whereClause = conditions.isEmpty() ? "" : " WHERE " + String.join(" AND ", conditions);
        String orderClause = orderings.isEmpty() ? "" : " ORDER BY " + String.join(", ", orderings);
        return selectClause + whereClause + orderClause;
    }
}