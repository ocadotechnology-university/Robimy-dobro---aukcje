package com.example.backend.repository;

import org.springframework.stereotype.Repository;

import java.io.IOException;
import java.util.List;

@Repository
public interface CityRepository {
    List<String> getAllCities() throws IOException;
}