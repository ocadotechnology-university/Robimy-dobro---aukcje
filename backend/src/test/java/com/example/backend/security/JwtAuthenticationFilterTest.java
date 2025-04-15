package com.example.backend.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.MockedStatic;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.*;
import org.springframework.security.core.context.SecurityContextHolder;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class JwtAuthenticationFilterTest {

    private JwtAuthenticationFilter filter;

    @BeforeEach
    void setUp() {
        SecurityContextHolder.clearContext();
        filter = new JwtAuthenticationFilter();
    }

    @Test
    void doFilter_validToken_shouldSetSecurityContext() throws Exception {
        String validToken = "Bearer valid.jwt.token";
        MockHttpServletRequest request = new MockHttpServletRequest();
        request.addHeader("Authorization", validToken);
        MockHttpServletResponse response = new MockHttpServletResponse();
        MockFilterChain filterChain = new MockFilterChain();

        @SuppressWarnings("unchecked")
        Jws<Claims> mockJws = mock(Jws.class);
        Claims mockClaims = mock(Claims.class);

        when(mockJws.getBody()).thenReturn(mockClaims);
        when(mockClaims.getSubject()).thenReturn("test@example.com");
        when(mockClaims.get("name")).thenReturn("Test User");
        when(mockClaims.get("role")).thenReturn("ADMIN");

        try (MockedStatic<JwtTokenProvider> mocked = mockStatic(JwtTokenProvider.class)) {
            mocked.when(() -> JwtTokenProvider.parseToken("valid.jwt.token"))
                    .thenReturn(mockJws);

            filter.doFilter(request, response, filterChain);
        }

        assertNotNull(SecurityContextHolder.getContext().getAuthentication(),
                "Authentication should not be null for valid token");
        assertEquals("test@example.com",
                SecurityContextHolder.getContext().getAuthentication().getPrincipal(),
                "Principal (email) should match token subject");
        assertEquals("Test User",
                SecurityContextHolder.getContext().getAuthentication().getCredentials(),
                "Credentials should match 'name' claim");
        assertTrue(SecurityContextHolder.getContext().getAuthentication().getAuthorities()
                        .stream()
                        .anyMatch(a -> a.getAuthority().equals("ROLE_ADMIN")),
                "Should have ROLE_ADMIN from token");
        assertEquals(200, response.getStatus(), "Should continue filter chain with status 200");
    }
}