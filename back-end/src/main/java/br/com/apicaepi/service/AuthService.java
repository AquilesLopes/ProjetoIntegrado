package br.com.apicaepi.service;

import br.com.apicaepi.dto.AuthTokenJwtDto;
import br.com.apicaepi.dto.LoginDto;
import br.com.apicaepi.security.JWTGenerator;
import br.com.apicaepi.service.exception.DataIntegrityException;
import br.com.apicaepi.util.ValidatorUtil;
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

    private UrlMapperService urlMapperService;

    @Autowired
    public AuthService(AuthenticationManager authenticationManager,
                       JWTGenerator jwtGenerator,
                       UrlMapperService urlMapperService) {
        this.authenticationManager = authenticationManager;
        this.jwtGenerator = jwtGenerator;
        this.urlMapperService = urlMapperService;
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

        AuthTokenJwtDto tokenDto = new AuthTokenJwtDto(token, expiration, "Bearer");
        urlMapperService.mapperTokenDto(tokenDto);

        return tokenDto;
    }

    public boolean validPassword(String email, String password) {
        if(!ValidatorUtil.isEmailValid(email) || password == null){
            return false;
        }

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(email, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);

        return authentication.isAuthenticated();
    }

}
