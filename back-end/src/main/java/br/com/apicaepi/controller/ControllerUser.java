package br.com.apicaepi.controller;

import br.com.apicaepi.dto.*;
import br.com.apicaepi.service.UserService;
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
import java.util.Map;

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
    @Operation(summary = "Find User by email", description = "Found the User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Invalid email supplied",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "User not found",
                    content = @Content)
    })
    public ResponseEntity<UserDto> findByEmail(@PathVariable(value="email") String email) {
        UserDto user = userService.findByEmail(email);

        return ResponseEntity.ok().body(user);
    }

    @PutMapping(value="/", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Update User", description = "Update User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity",
                    content = @Content)
    })
    public ResponseEntity<UserDto> updateByEmail(@RequestBody UpdateUserDto updateUserDto) {
        UserDto user = userService.updateUserLogged(updateUserDto);

        return ResponseEntity.ok().body(user);
    }

    @PutMapping(value="/password", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Update User", description = "Update User")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity",
                    content = @Content)
    })
    public ResponseEntity<String> updatePassword(@RequestBody UpdatePasswordUserDto updatePasswordUserDto) {
        userService.updatePassword(updatePasswordUserDto);

        return ResponseEntity.ok().body("Success");
    }

    @PutMapping(value="/icon-image-64", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Update icon image base 64", description = "Update icon image base 64")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application",
                            schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Bad Request",
                    content = @Content),
            @ApiResponse(responseCode = "401", description = "Unauthorized",
                    content = @Content),
            @ApiResponse(responseCode = "422", description = "Unprocessable Entity",
                    content = @Content)
    })
    public ResponseEntity<UserDto> updateIconImage64(@RequestBody Map<String, String> payload) {
        UserDto user = userService.updateIconImage64(payload.get("iconImage64"));

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
