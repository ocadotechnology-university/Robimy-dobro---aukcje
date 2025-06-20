package com.example.backend.repository;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

public interface DateRepository {
    List<LocalDate> getAllDates() throws IOException;
}