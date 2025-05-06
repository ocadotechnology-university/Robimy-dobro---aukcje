package com.example.backend.util;

public class AdminQuery {
    private final String email;

    public AdminQuery(String email) {
        this.email = email;
    }

    public String getQuery() {
        return "SELECT A WHERE A = '" + email + "'";
    }
}