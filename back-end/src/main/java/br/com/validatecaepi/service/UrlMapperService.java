package br.com.validatecaepi.service;

import br.com.validatecaepi.dto.AuthTokenJwtDto;
import br.com.validatecaepi.dto.CaepiDto;
import br.com.validatecaepi.model.Link;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class UrlMapperService {

    @Value("${system.url.base}")
    private static String URL_BASE;

    public static void mapperCaepiDTO(CaepiDto caepiDTO){
        Link linkManufacturer = new Link();
        linkManufacturer.setUrl(URL_BASE + "/api/v1/manufacturer/" + caepiDTO.getEquipment().getManufacturer().getCnpj());
        linkManufacturer.setType("GET");
        linkManufacturer.setDescription("Returns a page CAEPI by manufacturer, sorted descending by CAEPI number");
        linkManufacturer.setParameters("Authorization", "Header Parameter, Bearer ...Your Token...");
        linkManufacturer.setParameters("page", "Request Parameter, default 0");
        linkManufacturer.setParameters("size", "Request Parameter, default 10, minimum 3, maximum 20");

        Link linkLaboratory = new Link();
        linkLaboratory.setUrl(URL_BASE + "/api/v1/laboratory/" + caepiDTO.getReport().getLaboratory().getCnpj());
        linkLaboratory.setType("GET");
        linkLaboratory.setDescription("List CAEPI by laboratory, sorted descending by CAEPI number");
        linkLaboratory.setParameters("Authorization", "Header Parameter, Bearer ...Your Token...");
        linkLaboratory.setParameters("page", "Request Parameter, default 0");
        linkLaboratory.setParameters("size", "Request Parameter, default 10, minimum 3, maximum 20");

        caepiDTO.getLinks().add(linkManufacturer);
        caepiDTO.getLinks().add(linkLaboratory);
    }

    public static void mapperTokenDto(AuthTokenJwtDto tokenDto){
        Link linkRefresh = new Link();
        linkRefresh.setUrl(URL_BASE + "/api/v1/auth/refresh");
        linkRefresh.setType("GET");
        linkRefresh.setDescription("Refresh Token");
        linkRefresh.setParameters("Authorization", "Header Parameter, Bearer ...Your Token...");

        tokenDto.getLinks().add(linkRefresh);
    }



}
