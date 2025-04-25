package com.example.backend.security;

import com.example.backend.util.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtTokenProvider {
    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public static String generateAccessToken(GoogleIdToken.Payload token) {
        String email = token.getEmail();
        String name = (String) token.get("name");

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 600000);

        return Jwts.builder()
                .setSubject(email)
                .claim("name", name)
                .claim("role", Role.ADMIN)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }
}
