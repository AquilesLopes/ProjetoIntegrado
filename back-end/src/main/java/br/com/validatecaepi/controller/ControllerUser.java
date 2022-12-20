package br.com.validatecaepi.controller;

import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.dto.RegisterDto;
import br.com.validatecaepi.dto.UserDto;
import br.com.validatecaepi.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping(value = "/api/v1/user", name="Controllers Users")
public class ControllerUser {

    private UserService userService;

    @Value("${system.url.base}")
    private String URL_BASE;

    @Autowired
    public ControllerUser(UserService userService) {
        this.userService = userService;
    }

    @GetMapping(value="/{email}", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Find User by number", description = "Found the User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid number supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    private ResponseEntity<UserDto> findByEmail(@PathVariable(value="number") String email) {
        UserDto user = userService.findByEmail(email);

        return ResponseEntity.ok().body(user);
    }

    @PostMapping(value="/register", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Register", description = "Register in to the system")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Data Integrity Exception",
                    content = @Content),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity",
                    content = @Content)
    })
    public ResponseEntity<UserDto> register(@Valid @RequestBody RegisterDto registerDto){
        UserDto userDto = userService.register(registerDto);

        String urlUser = URL_BASE + "/user/email/" + userDto.getEmail();

        return ResponseEntity.created(URI.create(urlUser)).body(userDto);
    }

}
