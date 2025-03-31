package com.example.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.example.backend.service.GoogleSheetsService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.io.IOException;
import java.util.List;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ApplicationContext ctx) {
		return args -> {
			GoogleSheetsService sheetsService = ctx.getBean(GoogleSheetsService.class);
			try {
				List<List<Object>> values = sheetsService.readSheet("Auction!A1:A1");
				if (values != null && !values.isEmpty() && !values.get(0).isEmpty()) {
					System.out.println("Value in A1: " + values.get(0).get(0));
				} else {
					System.out.println("Cell A1 is empty!");
				}
			} catch (IOException e) {
				System.err.println("Error reading Google Sheet: " + e.getMessage());
			}

			// Test task: Writing example data to a Google Sheet (range A4:C4)
			List<List<Object>> dataToWrite = List.of(
					List.of("First cell", "Second cell", "Third cell")
			);
			try {
				sheetsService.writeToSheet("Auction!A4:C4", dataToWrite);
				System.out.println("Data successfully written to the Google Sheet.");
			} catch (IOException e) {
				System.err.println("Error while writing to Google Sheet: " + e.getMessage());
			}
		};
	}

}
