package com.example.backend.gviz;

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
        private List<Column> cols;
        private List<Row> rows;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class Column {
        private String id;
        private String label;
        private String type;
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

    @Data
    public static class VWrapper {
        private String v;
        private String vd;
    }}