package br.com.validatecaepi.service;

import br.com.validatecaepi.dto.AuthTokenJwtDto;
import br.com.validatecaepi.dto.LoginDto;
import br.com.validatecaepi.security.JWTGenerator;
import br.com.validatecaepi.service.exception.DataIntegrityException;
import br.com.validatecaepi.util.ValidatorUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class AuthService {

    private AuthenticationManager authenticationManager;
    private JWTGenerator jwtGenerator;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager,
                          JWTGenerator jwtGenerator) {
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
    }

    public AuthTokenJwtDto login(LoginDto loginDto) {
        if(!ValidatorUtil.isEmailValid(loginDto.getEmail())){
            throw new DataIntegrityException("Email is invalid.");
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtGenerator.generateToken(authentication);
        Date expiration = jwtGenerator.getExpirationFromJWT(token);

        return new AuthTokenJwtDto(token, expiration, "Bearer");
    }

}
