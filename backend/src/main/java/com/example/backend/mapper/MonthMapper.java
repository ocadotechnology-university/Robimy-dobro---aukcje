package com.example.backend.mapper;

import com.example.backend.constants.MonthsMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class MonthMapper {
    @Autowired
    private MonthsMap monthsMap;

    public String mapFromPolishMonthToEnglish(String date) {

        for (Map.Entry<String, String> element : monthsMap.getMonthMap().entrySet()) {
            if (date.contains(element.getKey())) {
                return date.replace(element.getKey(), element.getValue());
            }
        }

        return date;
    }
}

