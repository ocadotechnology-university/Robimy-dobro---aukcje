package com.example.backend.constants;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class MonthsMap {
    private final Map<String, String> monthsMap = new HashMap<String, String>();

    @PostConstruct
    public void createMonthsMap() {
        monthsMap.put("stycznia", "January");
        monthsMap.put("lutego", "February");
        monthsMap.put("marca", "March");
        monthsMap.put("kwietnia", "April");
        monthsMap.put("maja", "May");
        monthsMap.put("czerwca", "June");
        monthsMap.put("lipca", "July");
        monthsMap.put("sierpnia", "August");
        monthsMap.put("września", "September");
        monthsMap.put("października", "October");
        monthsMap.put("listopada", "November");
        monthsMap.put("grudnia", "December");
    }
    public Map<String, String> getMonthMap() {
        return monthsMap;
    }
}
