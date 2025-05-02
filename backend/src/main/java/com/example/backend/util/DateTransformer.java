package com.example.backend.util;

import com.example.backend.mapper.MonthMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Year;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

@Component
public class DateTransformer {
    @Autowired
    private MonthMapper monthMapper;

    public LocalDate transformDate(String dateFromForm) {
        LocalDate date = null;

        if(dateFromForm != null) {
            String mappedDate = monthMapper.mapFromPolishMonthToEnglish(dateFromForm);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMMM yyyy", Locale.ENGLISH);
            date = LocalDate.parse(mappedDate + " " + String.valueOf(Year.now().getValue()), formatter);
        }

        return date;
    }
}
