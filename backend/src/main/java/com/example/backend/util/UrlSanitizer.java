package com.example.backend.util;

import java.util.HashMap;
import java.util.Map;

public class UrlSanitizer {

    private static final Map<String, String> replacements = new HashMap<>();

    static {
        replacements.put("%2C", ",");
        replacements.put("%3D", "=");
        replacements.put("%27", "'");
        replacements.put("%28", "(");
        replacements.put("%29", ")");
        replacements.put("%2E", ".");
        replacements.put("%40", "@");
    }

    public static String sanitize(String url) {
        for (Map.Entry<String, String> entry : replacements.entrySet()) {
            url = url.replace(entry.getKey(), entry.getValue());
        }
        return url;
    }
}