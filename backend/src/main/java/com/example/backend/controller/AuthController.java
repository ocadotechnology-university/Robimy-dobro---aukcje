package com.example.backend.controller;

import com.example.backend.constants.CustomException;
import com.example.backend.service.GoogleAuthService;
import com.example.backend.security.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.example.backend.constants.ErrorMessages.WRONG_EMAIL;
import static com.example.backend.security.JwtTokenProvider.generateAccessToken;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

    static final String COMPANY_NAME = "pwr.edu";

    @Autowired
    GoogleAuthService googleAuthService;

    @PostMapping("/google/signup")
    public ResponseEntity<?> googleSignUp(@RequestBody Map<String, String> body) {

        String googleToken = body.get("credentials");

        try {
            GoogleIdToken.Payload verifiedToken = googleAuthService.verifyGoogleToken(googleToken);

            if (!verifiedToken.getEmail().split("@")[1].contains(COMPANY_NAME)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_EMAIL);
            }

            Role role = googleAuthService.getUserRoleByEmail(verifiedToken.getEmail());
            String accessToken = generateAccessToken(verifiedToken, role);
            Map<String, String> tokenResponse = new HashMap<>();
            tokenResponse.put("accessToken", accessToken);

            return ResponseEntity.ok(tokenResponse);

        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @GetMapping("/refresh")
    public ResponseEntity<?> refresh(@RequestHeader("Authorization") String token, HttpServletRequest request, HttpServletResponse response) {
        Cookie[] cookies = request.getCookies();
        for(Cookie cookie : cookies) {
            if(cookie.getName().equals("refreshToken")) {
                String refreshToken = cookie.getValue();
                try{
                    String accessToken = generateAccessToken(refreshToken);
                    response.setHeader("Authorization", "Bearer " + accessToken);
                    return ResponseEntity.ok(accessToken);
                }catch (Exception e) {
                    logger.info("Refresh token was expired");
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
                }
            }
        }
        logger.info("Refresh token not found");
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
