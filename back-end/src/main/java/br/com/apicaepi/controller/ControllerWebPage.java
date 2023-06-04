package br.com.apicaepi.controller;

import br.com.apicaepi.dto.CaepiDto;
import br.com.apicaepi.model.InfoDataBase;
import br.com.apicaepi.service.CaepiService;
import br.com.apicaepi.service.InfoDataBaseService;
import br.com.apicaepi.service.exception.AuthorizationException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/web-page", name="Controllers Web Page")
public class ControllerWebPage {

    private final CaepiService caepiService;

    private final InfoDataBaseService infoDataBaseService;

    @Value("${system.token.web.page}")
    private String TOKEN_WEB_PAGE;

    @Autowired
    public ControllerWebPage(CaepiService caepiService, InfoDataBaseService infoDataBaseService) {
        this.caepiService = caepiService;
        this.infoDataBaseService = infoDataBaseService;
    }

    @GetMapping(value="/caepi/{number}", produces={MediaType.APPLICATION_JSON_VALUE})
    private ResponseEntity<CaepiDto> findSimpleByNumber(@PathVariable(value="number") long number, HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        if(!authorization.equals(TOKEN_WEB_PAGE)){
            throw new AuthorizationException("Access denied");
        }

        CaepiDto caepi = caepiService.findSimpleByNumber(number);
        return ResponseEntity.ok().body(caepi);
    }

    @GetMapping(value="/info-data-base", produces={MediaType.APPLICATION_JSON_VALUE})
    private ResponseEntity<InfoDataBase> findById(HttpServletRequest request) {
        String authorization = request.getHeader("Authorization");

        if(!authorization.equals(TOKEN_WEB_PAGE)){
            throw new AuthorizationException("Access denied");
        }

        return ResponseEntity.ok().body(infoDataBaseService.getLastInfo());
    }

}
