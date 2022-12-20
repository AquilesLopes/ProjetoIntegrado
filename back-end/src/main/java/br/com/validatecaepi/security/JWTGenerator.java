package br.com.validatecaepi.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTGenerator {

    @Value("${jwt.secret}")
    private String JWT_SECRET;

    @Value("${jwt.expiration}")
    private Long JWT_EXPIRATION;

    public String generateToken(Authentication authentication){
        String userName = authentication.getName();
        Date currentDate = new Date();
        Date expireDate = new Date(currentDate.getTime() + JWT_EXPIRATION);

        String token = Jwts.builder()
                .setSubject(userName)
                .setIssuedAt(currentDate)
                .setExpiration(expireDate)
                .signWith(SignatureAlgorithm.HS512, JWT_SECRET)
                .compact();
        return token;
    }

    public String getUserNameFromJWT(String token){
        Claims claims = getClaims(token);
        return claims != null ? claims.getSubject() : null;
    }

    public Date getExpirationFromJWT(String token){
        Claims claims = getClaims(token);
        return claims != null ? claims.getExpiration() : null;
    }

    public boolean validateToken(String token){
        try{
            Claims claims = getClaims(token);
            if(claims != null) {
                String username = claims.getSubject();
                Date expirationDate = claims.getExpiration();
                Date now = new Date(System.currentTimeMillis());

                if(username != null && expirationDate != null && now.before(expirationDate)) {
                    return true;
                }
            }
        }catch (Exception e){
        }
        return false;
    }

    private Claims getClaims(String token) {
        try {
            return Jwts.parser().setSigningKey(JWT_SECRET).parseClaimsJws(token).getBody();
        }catch (Exception e) {
            return null;
        }
    }
}
