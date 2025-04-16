package com.example.backend.controller;

import com.example.backend.constants.CustomExeption;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.GoogleAuthService;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import io.jsonwebtoken.Jwt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import static com.example.backend.constants.ErrorMessages.WRONG_EMAIL;

@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
    static final String COMPANY_NAME = "pwr.edu";

    @Autowired
    GoogleAuthService googleAuthService;

    @PostMapping("/google/signup")
    public ResponseEntity<?> googleSignUp(@RequestBody Map<String, String> body) {

        String googleToken = body.get("credentials");

        try{
            GoogleIdToken.Payload verifiedToken = googleAuthService.verifyGoogleToken(googleToken);
            if(verifiedToken.getEmail().split("@")[1].contains(COMPANY_NAME)){
                String accessToken = JwtTokenProvider.generateAccessToken(verifiedToken);
                Map<String, String> tokenResponse = new HashMap<>();
                tokenResponse.put("accessToken", accessToken);
                return ResponseEntity.ok(tokenResponse);
            }else{
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(WRONG_EMAIL);
            }

        } catch (CustomExeption e){
            return  ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
    }

    @PostMapping("/test")
    public ResponseEntity<?> protectedRoute(@RequestHeader("Authorization") String authorizationHeader) {
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Authorization token is missing or invalid");
        }

        String token = authorizationHeader.substring(7);

        try {
            if(!JwtTokenProvider.verifyToken(token)){
                return ResponseEntity.ok().body("Verification Successful");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        }
        return null;
    }
}
