package com.example.backend.controller;

import com.example.backend.service.DateService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/dates")
public class DateController {
    private final DateService dateService;

    public DateController(DateService dateService) {
        this.dateService = dateService;
    }

    @GetMapping
    public ResponseEntity<List<LocalDate>> getAllDates() {
        List<LocalDate> dates = List.of(
                LocalDate.of(2025, 11, 21),
                LocalDate.of(2025, 11, 22),
                LocalDate.of(2025, 11, 23)
        );
        return ResponseEntity.ok(dates);
    }
}