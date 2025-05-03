package com.example.backend.util;

import org.springframework.stereotype.Component;
import java.time.LocalDate;

@Component
public class DateTransformer {
    public LocalDate transformDate(String dateFromForm) {
        if(dateFromForm == null) return null;

        return LocalDate.parse(dateFromForm);
    }
}
