package com.example.backend.security;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;

public class JwtTokenProvider {
    private static final Key secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);
    public static String generateAccessToken(GoogleIdToken.Payload token, Role role) {
        String email = token.getEmail();
        String name = (String) token.get("name");

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + 60_000_000);

        return Jwts.builder()
                .setSubject(email)
                .claim("name", name)
                .claim("role", role.name())
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(secretKey)
                .compact();
    }

    public static Jws<Claims> parseToken(String token) throws Exception {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(secretKey)
                    .build()
                    .parseClaimsJws(token);
        } catch (ExpiredJwtException e) {
            throw new Exception("Token expired", e);
        } catch (Exception e) {
            throw new Exception("Token invalid", e);
        }
    }
}
