package com.example.backend.util;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Data;
import java.util.List;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class Response {
    private Table table;

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Table {
        private List<Row> rows;
    }

    @Data
    public static class Row {
        private List<Cell> c;
    }

    @Data
    public static class Cell {
        private Object v;
        private String f;
    }
}