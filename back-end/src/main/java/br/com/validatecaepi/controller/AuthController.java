package br.com.validatecaepi.controller;

import br.com.validatecaepi.dto.*;
import br.com.validatecaepi.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/v1/auth", name="Controllers Authentication")
public class AuthController {

    private AuthService authService;

    @Autowired
    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping(value="login", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Login", description = "Log in to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Data Integrity Exception",
                    content = @Content),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity",
                    content = @Content)
    })
    public ResponseEntity<AuthTokenJwtDto> login(@Valid @RequestBody LoginDto loginDto) {
        AuthTokenJwtDto authTokenJwtDto = authService.login(loginDto);

        return ResponseEntity.ok().body(authTokenJwtDto);
    }



}
