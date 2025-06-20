package com.example.backend.service;

import com.example.backend.repository.DateRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@Service
public class DateService {
    private final DateRepository dateRepository;

    public DateService(DateRepository dateRepository) {
        this.dateRepository = dateRepository;
    }

    public List<LocalDate> getAllDates() throws IOException {
        return dateRepository.getAllDates();
    }
}