package com.example.backend.controller;

import com.example.backend.constants.CustomException;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.GoogleAuthService;
import com.example.backend.security.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import static com.example.backend.constants.ErrorMessages.WRONG_EMAIL;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
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
            String accessToken = JwtTokenProvider.generateAccessToken(verifiedToken, role);
            Map<String, String> tokenResponse = new HashMap<>();
            tokenResponse.put("accessToken", accessToken);

            return ResponseEntity.ok(tokenResponse);

        } catch (CustomException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

}
