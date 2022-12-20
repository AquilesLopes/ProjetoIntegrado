package br.com.validatecaepi.controller;

import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.service.CaepiService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/caepi", name="Controllers CAEPI")
public class ControllerCaepi {

    private final CaepiService caepiService;

    @Autowired
    public ControllerCaepi(CaepiService caepiService) {
        this.caepiService = caepiService;
    }

    @GetMapping(value="/{number}", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Find CAEPI by number", description = "Found the CAEPI")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Success",
                content = { @Content(mediaType = "application",
                schema = @Schema(implementation = CaepiDto.class)) }),
        @ApiResponse(responseCode = "400", description = "Invalid number supplied",
                content = @Content),
        @ApiResponse(responseCode = "404", description = "CAEPI not found",
                content = @Content)
    })
    private ResponseEntity<CaepiDto> findById(@PathVariable(value="number") long number) {
        CaepiDto caepi = caepiService.findByNumber(number);

        return ResponseEntity.ok().body(caepi);
    }

    @GetMapping(value="/laboratory/{cnpj}", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Find CAEPI by CNPJ laboratory", description = "Found the laboratory")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Data integrity",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Laboratory not found",
                    content = @Content)
    })
    private ResponseEntity<Page<CaepiDto>> findByLaboratory(
            @PathVariable(value="cnpj") String cnpj,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<CaepiDto> pageCaepi = caepiService.findByLaboratory(cnpj, page, size);
        return ResponseEntity.ok().body(pageCaepi);
    }

    @GetMapping(value="/manufacturer/{cnpj}", produces={MediaType.APPLICATION_JSON_VALUE})
    @Operation(summary = "Find CAEPI by CNPJ manufacturer", description = "Found the manufacturer")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Success",
                    content = { @Content(mediaType = "application/json",
                    schema = @Schema(implementation = CaepiDto.class)) }),
            @ApiResponse(responseCode = "400", description = "Data integrity",
                    content = @Content),
            @ApiResponse(responseCode = "404", description = "Manufacturer not found",
                    content = @Content)
    })
    private ResponseEntity<Page<CaepiDto>> findByManufacturer(
            @PathVariable(value="cnpj") String cnpj,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<CaepiDto> pageCaepi = caepiService.findByManufacturer(cnpj, page, size);
        return ResponseEntity.ok().body(pageCaepi);
    }

}
