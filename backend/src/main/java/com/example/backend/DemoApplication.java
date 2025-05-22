package com.example.backend;

//import com.example.backend.dto.AuctionUpdateDto;
import com.example.backend.mapper.AuctionMapper;
import com.example.backend.model.Auction;
import com.example.backend.repository.AuctionRepository;
import com.example.backend.repository.GoogleSheetsAuctionRepository;
import com.example.backend.service.AuctionService;
import com.example.backend.service.GoogleSheetsService;
import com.example.backend.util.GvizResponseParser;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	@Bean
	CommandLineRunner run(ApplicationContext ctx) {
		return args -> {
			GoogleSheetsService sheetsService = ctx.getBean(GoogleSheetsService.class);


//			AuctionRepository auctionRepository = new GoogleSheetsAuctionRepository(new GoogleSheetsService(), new GvizResponseParser());
//			AuctionMapper auctionMapper = new AuctionMapper();
//			AuctionService auctionService = new AuctionService(auctionRepository, auctionMapper);
//			UUID id = UUID.fromString("5f3ceb8e-3707-4a57-a1b2-fa5674e7b38c");
//			AuctionUpdateDto auctionUpdateDto = auctionService.getAuctionUpdateDtoById(id, "272932@student.pwr.edu.pl");
//			System.out.println(auctionUpdateDto.getAuctionDate());
//			System.out.println(auctionUpdateDto.getTitle());
//			System.out.println(auctionUpdateDto.getDescription());
//			System.out.println(auctionUpdateDto.getCity());
//			System.out.println(auctionUpdateDto.getFileId());
//			System.out.println(auctionUpdateDto.getStartingPrice());
//			System.out.println(auctionUpdateDto.getWantsToBeModerator());

//			AuctionUpdateDto auctionUpdateDto = new AuctionUpdateDto();
//			auctionUpdateDto.setStartingPrice(155.99);
//			auctionUpdateDto.setTitle("Aukcja50");
//			auctionUpdateDto.setDescription("Aukcja50 - opis");
//			auctionUpdateDto.setCity("Kraków ;)");
//			auctionUpdateDto.setWantsToBeModerator(true);
//			auctionUpdateDto.setAuctionDate("2025-09-09");
//			String username = "999090@student.pwr.edu.pl";
//			auctionService.update(id, auctionUpdateDto, username);
		};
	}

}
