package com.example.backend.controller;

import com.example.backend.service.CityService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/cities")
public class CityController {
    private final CityService cityService;

    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping
    public ResponseEntity<?> getAllCities() {
        try {
            List<String> cities = cityService.getAllCities();
            return ResponseEntity.ok(cities);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to fetch cities: " + e.getMessage());
        }
    }
}