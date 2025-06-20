package com.example.backend.controller;

import com.example.backend.service.DateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/dates")
public class DateController {
    private final DateService dateService;

    public DateController(DateService dateService) {
        this.dateService = dateService;
    }

    @GetMapping
    public ResponseEntity<?> getAllDates() {
        try {
            return ResponseEntity.ok(dateService.getAllDates());

        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to fetch dates: " + e.getMessage());
        }
    }
}