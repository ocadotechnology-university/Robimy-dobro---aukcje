package com.example.backend.service;

import com.example.backend.repository.CityRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class CityService {
    private final CityRepository cityRepository;

    public CityService(CityRepository cityRepository) {
        this.cityRepository = cityRepository;
    }

    public List<String> getAllCities() throws IOException {
        return cityRepository.getAllCities();
    }
}